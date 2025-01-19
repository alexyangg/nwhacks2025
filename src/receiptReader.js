import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

const projectId = 'hopeful-timing-448222-j7';
const location = 'us'; // Format is 'us' or 'eu'
const processorId = 'ab59523845d4af68'; // Create the processor in the Cloud Console
// Instantiate a client
const client = new DocumentProcessorServiceClient();

async function processDocument(filePath) {

    const items = [];
    try {
        // Construct the full processor resource name
        const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

        // Read the file into memory
        const fs = require('fs').promises;
        const imageFile = await fs.readFile(filePath);

        // Convert the image data to a Buffer and base64 encode it
        const encodedImage = Buffer.from(imageFile).toString('base64');

        // Create the request payload
        const request = {
            name,
            rawDocument: {
                content: encodedImage,
                mimeType: 'image/jpeg', // Adjust the MIME type based on your file type
            },

            document: {
                languageHints: ['en']
            }
        };

        // Process the document
        const [result] = await client.processDocument(request);
        const { document } = result;

        console.log('\nThe document contains the following entities:');
        if (document.entities && document.entities.length > 0) {
            for (const entity of document.entities) {
                const item = {
                    name: '',
                    qty: '',
                    weight: ''
                };
                for (let j = 0; j < entity.properties.length; j++) {
                 let type = entity.properties[j].type;
                 let value = entity.properties[j].mentionText;

                 if (type === "grocery_item_name") {
                     item.name = value;
                 } else if (type === "grocery_item_quantity") {
                     item.qty = value;
                 } else if (type === "grocery_store_weight_unit") {
                     item.weight = value;
                 }
                }

                items.push(item)

                console.log(`name: ${item.name}`);
                console.log(`qty: ${item.qty}`);
                console.log(`weight: ${item.weight}`);
                console.log('---');
            }


        } else {
            console.log('No entities were detected in the document.');
        }


        return items;
    } catch (error) {
        console.error('Error processing the document:', error);
    }
}

//How to Call the function
//processDocument('C:\\Users\\David\\OneDrive\\Desktop\\code\\nwhacks2025New\\data\\veggielist.jpeg');
