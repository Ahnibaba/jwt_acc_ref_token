import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
    

    if (!accessToken) {
        console.log("No accessToken");
        
        return refresh(req, res, next);  // Pass next() to refresh so it can call it if needed
            }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }
            req.email = decoded.email;
            next();
        }
    );
};

const refresh = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(`This is refreshToken -------- ${refreshToken}`);
    

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "No Refresh token" });
            }

            const accessToken = jwt.sign(
                { email: decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1m" }
            );

            res.cookie("accessToken", accessToken, { maxAge: 60000 });
            req.email = decoded.email;

            // Call next() here to continue with the next middleware/controller
            next();
        }
    );
};

export { verifyJwt };
