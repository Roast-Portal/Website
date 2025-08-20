# Google Apps Script Integration for Quiz Submissions

## Overview

The quiz system now automatically submits all quiz responses to a Google Apps Script when users complete the quiz. This allows you to:

- Collect quiz data in Google Sheets
- Send automated emails with quiz results
- Integrate with other Google services
- Build custom workflows based on quiz responses

## How It Works

### 1. Quiz Completion Flow

When a user completes the quiz:

1. **Data Collection**: All quiz answers are collected into a structured payload
2. **Google Apps Script Submission**: Data is sent to the configured Google Apps Script URL
3. **User Feedback**: User sees submission status and success message
4. **Redirect**: User is redirected to checkout after 1.5 seconds

### 2. Enhanced Data Structure

Your Google Apps Script will receive comprehensive data including:

```javascript
{
  // Quiz Answers (all user preferences)
  roastLevel: "Medium",
  brewMethod: "Pour-over", 
  additions: "Black, Milk / Cream",
  cupsPerDay: "More than one cup per day",
  personality: "Enjoy some variety",
  tasteBalance: "Sweet & Smooth",
  flavorNutty: "75",
  flavorFruity: "60", 
  flavorFloral: "40",
  flavorSmoky: "30",
  priceRange: "20",
  equipmentDetails: "V60, Chemex",
  additionalNotes: "Love caramel notes",
  blendName: "Test Blend",
  
  // Contact Information
  firstName: "John",
  lastName: "Doe", 
  email: "john@example.com",
  
  // Enhanced Metadata for Your Script
  source: "quiz",
  tab: "FormResponses",
  submission_id: "quiz_1705757400000_abc123def",
  timestamp: "2025-01-20T10:30:00.000Z",
  
  // Analytics & Tracking
  page_path: "/quiz.html",
  referrer: "https://google.com",
  user_agent: "Mozilla/5.0...",
  
  // UTM Parameters (if available)
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "coffee_quiz",
  gclid: "abc123"
}
```

### 3. Submission Methods

The system uses two submission methods for reliability:

#### Primary: Fetch API
- Uses modern `fetch()` API with `FormData`
- Handles arrays and complex data types
- Provides real-time feedback

#### Fallback: Form Submission
- Creates a hidden HTML form if fetch fails
- Opens submission in new tab to avoid navigation issues
- Ensures data is always submitted

### 4. Your Script's Advanced Features

Your Google Apps Script provides enterprise-level functionality:

#### **Automatic Tab Routing**
- Quiz submissions → `FormResponses` tab
- Contact forms → `ContactCapture` tab
- No manual configuration needed

#### **Smart Deduplication**
- 10-minute cache prevents duplicate submissions
- Unique `submission_id` for each quiz completion
- Protects against accidental double-submissions

#### **Intelligent Parameter Handling**
- Automatically maps `firstName` ↔ `first_name`
- Supports both camelCase and snake_case
- Handles missing or malformed data gracefully

#### **Comprehensive Analytics**
- UTM parameter tracking
- Page path and referrer logging
- User agent and device information
- Timestamp and user ID generation

## Configuration

### Google Apps Script URL

The quiz is configured to submit to:
```
https://script.google.com/macros/s/AKfycbzPAMu_-e7bZ6qXQRawEQqAfmSMy3HnAS31qeayNCATDCsUHdDuipldJf253-FsB7WUog/exec
```

### Google Apps Script Setup

**✅ Your Google Apps Script is already configured and ready!**

The quiz integration is specifically designed to work with your existing script that handles:
- **FormResponses tab** for quiz submissions
- **ContactCapture tab** for contact forms
- **Automatic deduplication** with 10-minute caching
- **Parameter aliasing** (camelCase ↔ snake_case)
- **UTM tracking** and analytics
- **Location data** and user context

#### Your Script Features

```javascript
// Your script automatically handles:
// - Tab routing (quiz → FormResponses, contact → ContactCapture)
// - Parameter aliasing (firstName ↔ first_name)
// - Deduplication with submission_id
// - UTM tracking and analytics
// - Location and user context data

// Quiz submissions go to FormResponses tab with:
// - All quiz answers (roastLevel, brewMethod, additions, etc.)
// - Contact info (firstName, lastName, email)
// - Metadata (source: 'quiz', tab: 'FormResponses')
// - Tracking (submission_id, UTM params, page context)
// - Timestamp and user ID for analytics

// No additional setup needed - your script is production-ready!
```

## Testing

Use the included `test-google-script.html` file to test the integration:

1. **Open the test file** in a web browser
2. **Click "Test Fetch Submission"** to test the primary method
3. **Click "Test Form Submission"** to test the fallback method
4. **Check the console** for detailed logs

## Error Handling

The system includes comprehensive error handling:

- **Network errors** are caught and logged
- **Submission failures** don't prevent checkout
- **Fallback methods** ensure data is always sent
- **User feedback** shows submission status

## Analytics

Google Analytics events are tracked for:

- `quiz_submitted_to_google_script` - Successful fetch submission
- `quiz_submitted_to_google_script_fallback` - Successful form submission
- `quiz_submission_error` - Any submission errors

## Security Considerations

- **CORS mode**: Uses `no-cors` for cross-origin requests
- **Data validation**: All data is sanitized before submission
- **Error logging**: Errors are logged but don't expose sensitive information
- **Fallback handling**: Graceful degradation if primary method fails

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure Google Apps Script allows cross-origin requests
2. **Data not received**: Check Google Apps Script logs and execution history
3. **Form submission opens new tab**: This is expected behavior for the fallback method

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Verify Google Apps Script URL** is correct and accessible
3. **Test with the provided test file** to isolate issues
4. **Check Google Apps Script execution logs** for server-side errors

## Future Enhancements

Potential improvements:

- **Real-time validation** of Google Apps Script connectivity
- **Retry logic** for failed submissions
- **Offline support** with local storage and retry on reconnect
- **Data compression** for large quiz responses
- **Webhook support** for real-time notifications
