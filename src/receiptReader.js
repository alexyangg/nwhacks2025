/**
 * Script to process a document using Google Cloud Document AI
 * Ensure that the required packages are installed and the API is enabled in your Google Cloud project.
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Import the Document AI library
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

/**
 * Configuration variables. Update these with your project details.
 */
const projectId = 'hopeful-timing-448222-j7';
const location = 'us'; // Format is 'us' or 'eu'
const processorId = 'ab59523845d4af68'; // Create the processor in the Cloud Console
const filePath = 'C:\\Users\\David\\OneDrive\\Desktop\\code\\nwhacks2025New\\data\\grocerylist.jpg';

// Instantiate a client
const client = new DocumentProcessorServiceClient();

async function processDocument() {
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

        // Extract all document text
        const { text } = document;
        console.log('Extracted document text:\n', text);

        // Function to extract text from text anchors
        const getText = (textAnchor) => {
            if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
                return '';
            }

            const startIndex = textAnchor.textSegments[0].startIndex || 0;
            const endIndex = textAnchor.textSegments[0].endIndex;

            return text.substring(startIndex, endIndex);
        };

        console.log('\nThe document contains the following entities:');
        if (document.entities && document.entities.length > 0) {
            for (const entity of document.entities) {
                const type = entity.type || 'Unknown';
                const mentionText = entity.mentionText || 'N/A';
                const confidence = (entity.confidence * 100).toFixed(2) + '%';

                console.log(`Type: ${type}`);
                console.log(`Mention Text: ${mentionText}`);
                console.log(`Confidence: ${confidence}`);
                console.log('---');
            }
        } else {
            console.log('No entities were detected in the document.');
        }
    } catch (error) {
        console.error('Error processing the document:', error);
    }
}

// Call the function
processDocument();
