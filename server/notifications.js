import nodemailer from 'nodemailer';

/**
 * Notification Service Module
 * Handles automated email notifications for order status updates
 */

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'YOUR_EMAIL@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'YOUR_APP_PASSWORD'
        }
    });
};

/**
 * Email templates for different notification types
 */
const emailTemplates = {
    statusUpdate: (parcel, newStatus) => ({
        subject: `Order ${parcel.id} Status Update: ${newStatus}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
                    .status-delivered { background: #d1fae5; color: #065f46; }
                    .status-transit { background: #dbeafe; color: #1e40af; }
                    .status-pending { background: #fef3c7; color: #92400e; }
                    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🚚 Fast Track Courier</h1>
                        <p>Your Order Status Update</p>
                    </div>
                    <div class="content">
                        <h2>Hello! 👋</h2>
                        <p>Your order status has been updated:</p>
                        
                        <div class="details">
                            <p><strong>Tracking ID:</strong> ${parcel.id}</p>
                            <p><strong>From:</strong> ${parcel.sender}</p>
                            <p><strong>To:</strong> ${parcel.receiver}</p>
                            <p><strong>Type:</strong> ${parcel.type}</p>
                            <p><strong>New Status:</strong> <span class="status-badge status-${newStatus.toLowerCase().replace(' ', '-')}">${newStatus}</span></p>
                        </div>
                        
                        ${newStatus === 'Delivered'
                ? '<p style="color: #059669; font-weight: bold;">✅ Your package has been delivered successfully!</p>'
                : newStatus === 'In Transit'
                    ? '<p style="color: #2563eb;">📦 Your package is on its way!</p>'
                    : '<p>We\'ll keep you updated on your order progress.</p>'
            }
                        
                        <div class="footer">
                            <p>Fast Track Courier - Bangladesh's Premier Delivery Service</p>
                            <p>For support, contact us at support@fasttrack.bd</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
Fast Track Courier - Status Update

Your order ${parcel.id} status has been updated to: ${newStatus}

Order Details:
- Tracking ID: ${parcel.id}
- From: ${parcel.sender}
- To: ${parcel.receiver}
- Type: ${parcel.type}
- Status: ${newStatus}

Thank you for using Fast Track Courier!
        `
    }),

    bulkUploadConfirmation: (successCount, failureCount, totalCount) => ({
        subject: 'Bulk Order Upload Complete',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .stats { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .success { color: #059669; font-weight: bold; }
                    .failure { color: #dc2626; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Bulk Upload Complete</h2>
                    <div class="stats">
                        <p><strong>Total Orders Processed:</strong> ${totalCount}</p>
                        <p class="success">✅ Successful: ${successCount}</p>
                        <p class="failure">❌ Failed: ${failureCount}</p>
                    </div>
                    <p>Your bulk order upload has been processed.</p>
                </div>
            </body>
            </html>
        `,
        text: `Bulk Upload Complete\n\nTotal: ${totalCount}\nSuccessful: ${successCount}\nFailed: ${failureCount}`
    })
};

/**
 * Send status update notification
 * @param {Object} parcel - The parcel object
 * @param {string} newStatus - The new status
 * @param {string} recipientEmail - Email address to send to
 */
export const sendStatusUpdateNotification = async (parcel, newStatus, recipientEmail) => {
    try {
        const transporter = createTransporter();
        const template = emailTemplates.statusUpdate(parcel, newStatus);

        await transporter.sendMail({
            from: '"Fast Track Courier" <noreply@fasttrack.bd>',
            to: recipientEmail,
            subject: template.subject,
            html: template.html,
            text: template.text
        });

        console.log(`✅ Notification sent to ${recipientEmail} for order ${parcel.id}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Notification error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send bulk upload confirmation
 * @param {string} recipientEmail - Email address
 * @param {number} successCount - Number of successful uploads
 * @param {number} failureCount - Number of failed uploads
 * @param {number} totalCount - Total number of orders
 */
export const sendBulkUploadNotification = async (recipientEmail, successCount, failureCount, totalCount) => {
    try {
        const transporter = createTransporter();
        const template = emailTemplates.bulkUploadConfirmation(successCount, failureCount, totalCount);

        await transporter.sendMail({
            from: '"Fast Track Courier" <noreply@fasttrack.bd>',
            to: recipientEmail,
            subject: template.subject,
            html: template.html,
            text: template.text
        });

        return { success: true };
    } catch (error) {
        console.error('Bulk notification error:', error);
        return { success: false, error: error.message };
    }
};

export default {
    sendStatusUpdateNotification,
    sendBulkUploadNotification
};
