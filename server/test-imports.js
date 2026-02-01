// Create this file in your server root to test imports
import "dotenv/config";

console.log("Testing controller imports...");

try {
  const userController = await import("./src/controllers/user.controller.js");
  console.log("✅ User controller:", Object.keys(userController.default || {}));
} catch (error) {
  console.log("❌ User controller error:", error.message);
}

try {
  const favoriteController = await import("./src/controllers/favorite.controller.js");
  console.log("✅ Favorite controller:", Object.keys(favoriteController.default || {}));
} catch (error) {
  console.log("❌ Favorite controller error:", error.message);
}

try {
  const mediaController = await import("./src/controllers/media.controller.js");
  console.log("✅ Media controller:", Object.keys(mediaController.default || {}));
} catch (error) {
  console.log("❌ Media controller error:", error.message);
}

try {
  const reviewController = await import("./src/controllers/review.controller.js");
  console.log("✅ Review controller:", Object.keys(reviewController.default || {}));
} catch (error) {
  console.log("❌ Review controller error:", error.message);
}

try {
  const personController = await import("./src/controllers/person.controller.js");
  console.log("✅ Person controller:", Object.keys(personController.default || {}));
} catch (error) {
  console.log("❌ Person controller error:", error.message);
}

console.log("Testing middleware imports...");

try {
  const tokenMiddleware = await import("./src/middlewares/token.middleware.js");
  console.log("✅ Token middleware:", Object.keys(tokenMiddleware.default || {}));
} catch (error) {
  console.log("❌ Token middleware error:", error.message);
}

try {
  const requestHandler = await import("./src/handlers/request.handler.js");
  console.log("✅ Request handler:", Object.keys(requestHandler.default || {}));
} catch (error) {
  console.log("❌ Request handler error:", error.message);
}