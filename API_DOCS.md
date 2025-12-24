# API Documentation

Complete API reference for Fast Track Courier System.

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require an API key. Include it in the request header:

```
X-API-Key: your_api_key_here
```

To get an API key:
1. Login as admin
2. Navigate to API Settings
3. Generate a new API key

## Endpoints Overview

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/parcels` | GET | No | Get all parcels |
| `/api/parcels` | POST | No | Create new parcel |
| `/api/parcels/:id` | PUT | No | Update parcel status |
| `/api/parcels/:id` | DELETE | No | Delete parcel |
| `/api/parcels/bulk` | POST | No | Bulk upload parcels |
| `/api/track` | POST | No | Track parcel with verification |
| `/api/v1/parcels` | GET | **Yes** | API: Get all parcels |
| `/api/v1/parcels` | POST | **Yes** | API: Create parcel |
| `/api/v1/parcels/:id` | GET | **Yes** | API: Get single parcel |
| `/api/analytics/*` | GET | No | Analytics endpoints |
| `/api/admin/api-keys` | GET/POST/DELETE | No | Manage API keys |
| `/api/admin/webhooks` | GET/POST/DELETE | No | Manage webhooks |

---

## Parcel Management

### Get All Parcels

Retrieve all parcels from the system.

**Endpoint:** `GET /api/parcels`

**Query Parameters:**
- `clientId` (optional): Filter parcels by client ID

**Example Request:**
```bash
curl http://localhost:3000/api/parcels
```

**Response:**
```json
[
  {
    "id": "FT-1001",
    "sender": "ABC Electronics",
    "receiver": "John Doe",
    "type": "Express",
    "status": "In Transit",
    "date": "2025-12-22",
    "senderPhone": "01712345678",
    "address": "123 Main St, Dhaka",
    "notes": "Fragile items",
    "statusHistory": [
      {
        "status": "Pending Approval",
        "timestamp": "2025-12-22T08:00:00.000Z",
        "note": "Order created"
      },
      {
        "status": "In Transit",
        "timestamp": "2025-12-22T10:00:00.000Z",
        "note": "Status updated by admin"
      }
    ]
  }
]
```

### Create Parcel

Create a new delivery request.

**Endpoint:** `POST /api/parcels`

**Request Body:**
```json
{
  "id": "FT-1003",           // Optional, auto-generated if not provided
  "sender": "Tech Store",
  "receiver": "Jane Smith",
  "type": "Express",         // Express, Regular, Fragile, International
  "senderPhone": "01712345678",
  "receiverPhone": "01798765432",
  "address": "456 Park Ave, Dhaka",
  "notes": "Handle with care",
  "clientId": "USER-123456"  // Optional, for client association
}
```

**Response:**
```json
{
  "id": "FT-1003",
  "sender": "Tech Store",
  "receiver": "Jane Smith",
  "type": "Express",
  "status": "Pending Approval",
  "date": "2025-12-22",
  "senderPhone": "01712345678",
  "statusHistory": [
    {
      "status": "Pending Approval",
      "timestamp": "2025-12-22T12:30:00.000Z",
      "note": "Order created"
    }
  ]
}
```

### Update Parcel Status

Update the status of an existing parcel.

**Endpoint:** `PUT /api/parcels/:id`

**Request Body:**
```json
{
  "status": "In Transit",
  "statusHistory": [
    {
      "status": "In Transit",
      "timestamp": "2025-12-22T14:00:00.000Z",
      "note": "Picked up by courier"
    }
  ]
}
```

**Response:**
```json
{
  "id": "FT-1003",
  "status": "In Transit",
  "statusHistory": [...]
}
```

### Delete Parcel

Permanently remove a parcel from the system.

**Endpoint:** `DELETE /api/parcels/:id`

**Response:**
```json
{
  "message": "Deleted successfully"
}
```

### Track Parcel

Track a parcel with ID and phone verification.

**Endpoint:** `POST /api/track`

**Request Body:**
```json
{
  "id": "FT-1001",
  "phone": "01712345678"
}
```

**Response (Success):**
```json
{
  "success": true,
  "parcel": {
    "id": "FT-1001",
    "sender": "ABC Electronics",
    "receiver": "John Doe",
    "status": "In Transit",
    ...
  }
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Verification failed. Phone number does not match."
}
```

---

## Bulk Operations

### Bulk Upload Parcels

Upload multiple parcels via CSV or Excel file.

**Endpoint:** `POST /api/parcels/bulk`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: CSV or Excel file

**CSV Format:**
```csv
ID,Sender,Receiver,Type,Status,SenderPhone,ReceiverPhone,Address,Notes
FT-2001,ABC Store,John Doe,Express,Pending Approval,01712345678,01798765432,"123 Main St",Fragile
```

**Example Request (using curl):**
```bash
curl -X POST http://localhost:3000/api/parcels/bulk \
  -F "file=@orders.csv"
```

**Response:**
```json
{
  "success": true,
  "message": "Bulk upload complete. 10 orders created, 2 errors.",
  "totalProcessed": 12,
  "successCount": 10,
  "errorCount": 2,
  "errors": [
    {
      "row": 5,
      "error": "Missing required fields (Sender, Receiver, or Type)"
    },
    {
      "row": 8,
      "error": "Invalid type specified"
    }
  ]
}
```

---

## Analytics

### Overview Statistics

Get summary statistics for all orders.

**Endpoint:** `GET /api/analytics/overview`

**Response:**
```json
{
  "totalOrders": 150,
  "delivered": 120,
  "inTransit": 20,
  "pending": 8,
  "cancelled": 2,
  "deliveryRate": "80.00",
  "revenue": 75000
}
```

### Orders by Status

Get order count grouped by status.

**Endpoint:** `GET /api/analytics/orders-by-status`

**Response:**
```json
[
  { "name": "Delivered", "value": 120 },
  { "name": "In Transit", "value": 20 },
  { "name": "Pending Approval", "value": 8 },
  { "name": "Cancelled", "value": 2 }
]
```

### Orders by Type

Get order count grouped by delivery type.

**Endpoint:** `GET /api/analytics/orders-by-type`

**Response:**
```json
[
  { "name": "Express", "value": 80 },
  { "name": "Regular", "value": 50 },
  { "name": "Fragile", "value": 15 },
  { "name": "International", "value": 5 }
]
```

### Daily Trend

Get daily order counts for a specified period.

**Endpoint:** `GET /api/analytics/daily-trend`

**Query Parameters:**
- `days` (optional, default: 7): Number of days to retrieve

**Example Request:**
```bash
curl http://localhost:3000/api/analytics/daily-trend?days=14
```

**Response:**
```json
[
  {
    "date": "2025-12-15",
    "orders": 12,
    "formattedDate": "Dec 15"
  },
  {
    "date": "2025-12-16",
    "orders": 18,
    "formattedDate": "Dec 16"
  }
]
```

### Export Analytics

Download complete analytics data as CSV.

**Endpoint:** `GET /api/analytics/export`

**Response:** CSV file download

---

## API Integration (Third-Party)

These endpoints require API key authentication.

### Get All Parcels (API)

**Endpoint:** `GET /api/v1/parcels`

**Headers:**
```
X-API-Key: your_api_key
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "apiKeyName": "Mobile App"
}
```

### Create Parcel (API)

**Endpoint:** `POST /api/v1/parcels`

**Headers:**
```
X-API-Key: your_api_key
Content-Type: application/json
```

**Request Body:**
```json
{
  "sender": "API Store",
  "receiver": "Customer Name",
  "type": "Express",
  "senderPhone": "01712345678"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "FT-1734871234567",
    "sender": "API Store",
    ...
  }
}
```

### Get Single Parcel (API)

**Endpoint:** `GET /api/v1/parcels/:id`

**Headers:**
```
X-API-Key: your_api_key
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "FT-1001",
    ...
  }
}
```

---

## Admin Endpoints

### API Key Management

#### Get All API Keys

**Endpoint:** `GET /api/admin/api-keys`

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "key": "ftc_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "name": "Mobile App",
    "description": "API key for mobile application",
    "createdAt": "2025-12-20T10:00:00.000Z",
    "lastUsed": "2025-12-22T14:30:00.000Z",
    "usageCount": 245,
    "active": true
  }
]
```

#### Generate API Key

**Endpoint:** `POST /api/admin/api-keys`

**Request Body:**
```json
{
  "name": "Partner Integration",
  "description": "API key for partner system"
}
```

**Response:**
```json
{
  "success": true,
  "apiKey": {
    "id": "...",
    "key": "ftc_...",
    "name": "Partner Integration",
    "createdAt": "2025-12-22T15:00:00.000Z",
    "active": true
  }
}
```

#### Delete API Key

**Endpoint:** `DELETE /api/admin/api-keys/:id`

**Response:**
```json
{
  "success": true,
  "message": "API key deleted successfully"
}
```

#### Revoke API Key

**Endpoint:** `PUT /api/admin/api-keys/:id/revoke`

**Response:**
```json
{
  "success": true,
  "message": "API key revoked successfully"
}
```

### Webhook Management

#### Get All Webhooks

**Endpoint:** `GET /api/admin/webhooks`

**Response:**
```json
[
  {
    "id": "webhook-uuid",
    "url": "https://api.partner.com/webhook",
    "events": ["status_update"],
    "createdAt": "2025-12-20T10:00:00.000Z",
    "active": true
  }
]
```

#### Register Webhook

**Endpoint:** `POST /api/admin/webhooks`

**Request Body:**
```json
{
  "url": "https://api.partner.com/notifications",
  "events": ["status_update"]
}
```

**Response:**
```json
{
  "success": true,
  "webhook": {
    "id": "webhook-uuid",
    "url": "https://api.partner.com/notifications",
    "events": ["status_update"],
    "createdAt": "2025-12-22T15:00:00.000Z",
    "active": true
  }
}
```

#### Delete Webhook

**Endpoint:** `DELETE /api/admin/webhooks/:id`

**Response:**
```json
{
  "success": true,
  "message": "Webhook deleted successfully"
}
```

---

## Webhook Events

### Status Update Event

When a parcel status is updated, registered webhooks receive a POST request:

**Webhook Payload:**
```json
{
  "event": "status_update",
  "timestamp": "2025-12-22T15:30:00.000Z",
  "data": {
    "parcelId": "FT-1001",
    "newStatus": "Delivered",
    "parcel": {
      "id": "FT-1001",
      "sender": "ABC Electronics",
      "receiver": "John Doe",
      "type": "Express",
      "status": "Delivered",
      "statusHistory": [...]
    }
  }
}
```

**Headers Sent:**
```
Content-Type: application/json
X-Webhook-Event: status_update
```

---

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "message": "Error description here",
  "error": "Detailed error message (in development)"
}
```

### Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Valid API key but insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## Rate Limits

Currently, there are no rate limits implemented. For production use, consider implementing:
- Request rate limiting per API key
- File upload size limits (currently 5MB)
- Bulk upload row limits

---

## SDKs and Examples

### JavaScript/Node.js

```javascript
const apiKey = 'your_api_key';
const baseUrl = 'http://localhost:3000/api/v1';

// Create a parcel
async function createParcel(data) {
  const response = await fetch(`${baseUrl}/parcels`, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return await response.json();
}

// Get all parcels
async function getAllParcels() {
  const response = await fetch(`${baseUrl}/parcels`, {
    headers: {
      'X-API-Key': apiKey
    }
  });
  
  return await response.json();
}
```

### Python

```python
import requests

API_KEY = 'your_api_key'
BASE_URL = 'http://localhost:3000/api/v1'

def create_parcel(data):
    headers = {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
    }
    response = requests.post(f'{BASE_URL}/parcels', 
                           json=data, 
                           headers=headers)
    return response.json()

def get_all_parcels():
    headers = {'X-API-Key': API_KEY}
    response = requests.get(f'{BASE_URL}/parcels', 
                          headers=headers)
    return response.json()
```

---

## Support

For API support or questions:
- Create an issue on GitHub
- Email: firozhasan1542@gmail.com

## Changelog

### v1.0.0 (2025-12-22)
- Initial API release
- Parcel management endpoints
- Bulk upload functionality
- Analytics endpoints
- API key authentication
- Webhook support
