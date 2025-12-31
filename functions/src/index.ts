import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as cors from 'cors';

admin.initializeApp();
const corsHandler = cors({ origin: true });

export const postToInstagram = functions.firestore
    .document('scheduled_posts/{postId}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();

        // Check if status changed to 'approved' and it hasn't been posted yet
        if (newData.status === 'approved' && previousData.status !== 'approved' && !newData.isPosted) {

            console.log(`Processing post ${context.params.postId} for Instagram...`);

            try {
                // 1. Get User's Access Token (Mocked for now, normally stored in 'users/{uid}/connections/instagram')
                // Real implementation would fetch this from Firestore:
                // const userDoc = await admin.firestore().doc(`users/${newData.userId}`).get();
                // const accessToken = userDoc.data()?.instagramAccessToken;
                const pageId = newData.pageId || "17841400000000000"; // Mock Page ID
                const accessToken = process.env.FB_ACCESS_TOKEN || "mock_token";

                // 2. Create Media Container
                const containerUrl = `https://graph.facebook.com/v18.0/${pageId}/media`;
                const containerResponse = await axios.post(containerUrl, {
                    image_url: newData.imageUrl, // URL to image (must be public)
                    caption: newData.caption,
                    access_token: accessToken
                });

                const containerId = containerResponse.data.id;

                // 3. Publish Media
                const publishUrl = `https://graph.facebook.com/v18.0/${pageId}/media_publish`;
                await axios.post(publishUrl, {
                    creation_id: containerId,
                    access_token: accessToken
                });

                // 4. Update Firestore
                await change.after.ref.update({
                    status: 'posted',
                    isPosted: true,
                    postedAt: admin.firestore.FieldValue.serverTimestamp(),
                    platformResponse: { success: true, containerId }
                });

                console.log(`Successfully posted ${context.params.postId}`);

            } catch (error: any) {
                console.error('Instagram API Error:', error.response?.data || error.message);
                await change.after.ref.update({
                    status: 'failed',
                    error: error.message
                });
            }
        }
    });

// Manual trigger for testing
export const triggerPostManual = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        const { postId } = req.body;
        if (!postId) {
            res.status(400).send('Missing postId');
            return;
        }

        try {
            const docRef = admin.firestore().collection('scheduled_posts').doc(postId);
            const doc = await docRef.get();

            if (!doc.exists) {
                res.status(404).send('Post not found');
                return;
            }

            // Force update to trigger the background function
            await docRef.update({
                status: 'approved',
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            res.send({ success: true, message: 'Triggered post sequence' });
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });
});
