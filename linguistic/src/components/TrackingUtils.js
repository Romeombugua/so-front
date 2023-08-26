// trackingUtils.js

async function TrackVisitor() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/count`, {
        method: 'POST',
        credentials: 'include', // Send cookies with the request
      });
  
      if (response.ok) {
        console.log('Visitor tracked');
      } else {
        console.error('Failed to track visitor');
      }
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  }
  
  export default TrackVisitor;
  