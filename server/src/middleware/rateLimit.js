const { Ratelimit } = require("@upstash/ratelimit");
const redis = require("../utils/redis");
// signup and sign in rate limit
const authLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  timeout: 1000, // 1 second
  analytics: true,
});

// verify email

const verifyLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  timeout: 1000, // 1 second
  analytics: true,
});
const aiSummarize = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  timeout: 1000, // 1 second
  analytics: true,
});

const signupAndSignInLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { success, limit, remaining, reset } = await authLimiter.limit(ip);

    if (!success) {
      const waitSeconds = Math.ceil((reset - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many request. Please try in ${waitSeconds}s`,
        remaining,
        limit,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(err);
  }
};

const verifyEmailLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { success, limit, remaining, reset } = await verifyLimiter.limit(ip);

    if (!success) {
      const waitSeconds = Math.ceil((reset - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many verification emails sent. Please try in ${waitSeconds}s`,
        remaining,
        limit,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(err);
  }
};

const aiLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { success, limit, remaining, reset } = await aiSummarize.limit(ip);

    if (!success) {
      const waitSeconds = Math.ceil((reset - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please try in ${waitSeconds}s`,
        remaining,
        limit,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(err);
  }
};

module.exports = { signupAndSignInLimiter, verifyEmailLimiter, aiLimiter };
