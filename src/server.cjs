const express = require('express');
const multer = require('multer');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const path = require('path');
const cors = require("cors");
const fs = require('fs').promises;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Google Cloud Document AI Setup
const projectId = 'hopeful-timing-448222-j7';
const location = 'us';
const processorId = 'ab59523845d4af68';
const client = new DocumentProcessorServiceClient();

const processDocument = async (filePath) => {
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
    const imageFile = await fs.readFile(filePath);
    const encodedImage = Buffer.from(imageFile).toString('base64');

    const request = {
        name,
        rawDocument: {
            content: encodedImage,
            mimeType: 'image/jpeg',
        },
    };

    const [result] = await client.processDocument(request);
    const { document } = result;

    const getText = (textAnchor) => {
        if (!textAnchor?.textSegments || textAnchor.textSegments.length === 0) return '';
        const startIndex = textAnchor.textSegments[0].startIndex || 0;
        const endIndex = textAnchor.textSegments[0].endIndex;
        return document.text.substring(startIndex, endIndex);
    };

    const items = [];
    if (document.entities && document.entities.length > 0) {
        for (const entity of document.entities) {
            const item = { name: '', qty: '', weight: '' };
            if (entity.properties && entity.properties.length > 0) {
                for (const property of entity.properties) {
                    const type = property.type;
                    const value = getText(property.textAnchor);

                    if (type === 'grocery_item_name') {
                        item.name = value;
                    } else if (type === 'grocery_item_quantity') {
                        item.qty = value;
                    } else if (type === 'grocery_store_weight_unit') {
                        item.weight = value;
                    }
                }
            }
            items.push(item);
        }
    }
    return items;
};

// Upload Endpoint
app.post('/process', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const items = await processDocument(req.file.path);
        res.json(items); // Return items as JSON
    } catch (error) {
        console.error('Error processing document:', error);
        res.status(500).send('Error processing document.');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
