#!/bin/bash

# Quiz Submission Test Script
# Uses the Google Apps Script URL from checkout.html where quiz submissions are actually sent

echo "Testing Quiz Submission to Google Apps Script..."
echo "================================================"

# Google Script URL from checkout.html (where quiz submissions are actually sent)
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbxj_pC39hjHuXLbL_1wgS3FbAdps7RkwjF41kGdaPDkeJ9BfHC0WcFPc2QqhQn8L2IAXg/exec"

echo "Target URL: $GOOGLE_SCRIPT_URL"
echo ""

# Test data matching your curl command format
curl -X POST "$GOOGLE_SCRIPT_URL" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'tab=Orders' \
  --data-urlencode 'source=buy_click' \
  --data-urlencode 'firstName=Test' \
  --data-urlencode 'lastName=User' \
  --data-urlencode 'email=you@example.com' \
  --data-urlencode 'roastLevel=Medium' \
  --data-urlencode 'brewMethod=Drip' \
  --data-urlencode 'blendName=CLI Blend' \
  --data-urlencode 'billedServings=14' \
  --data-urlencode 'bonus=1' \
  --data-urlencode 'totalServings=15' \
  --data-urlencode 'submission_id=debug_123'

echo ""
echo ""
echo "Submission completed. Check your Google Apps Script logs for confirmation."
echo ""
echo "Note: The response will be minimal due to CORS restrictions."
echo "To verify success, check your Google Apps Script execution history and logs."
