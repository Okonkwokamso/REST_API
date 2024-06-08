"use strict";
/*

// Import necessary types from Express
import { Request, Response, NextFunction } from 'express';

// Function to extract access token from headers.authorization
function getAccessToken(req: Request): string | null {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and properly formatted
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token part from the header
        return authHeader.split(' ')[1];
        
    }

    // Return null if the authorization header is missing or not properly formatted
    return null;
}

// Example of using this function in an Express middleware
const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getAccessToken(req);
  if (token) {
    // Attach the token to the request object for further use
    req['accessToken'] = token;
    next(); // Call the next middleware or route handler
  } else {
    res.status(401).json({ error: 'Unauthorized: Access token is missing or invalid' });
  }

  next();
};

export default tokenMiddleware ;


*/
