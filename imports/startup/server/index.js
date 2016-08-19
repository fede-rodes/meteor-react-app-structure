// Import your server-side configs
import './config.js';
import './startup.js';

// Import all your server-side collections
import '../../api/properties/collection.js';
import '../../api/reviews/collection.js';
import '../../api/images/collection.js';

// Import all your server-side methods
import '../../api/users/methods.js';
import '../../api/email-system/server/methods.js';
import '../../api/mapbox/server/methods.js';
import '../../api/properties/methods.js';
import '../../api/reviews/methods.js';
import '../../api/images/server/methods.js';

// Import all your publications
import '../../api/users/server/publications.js';
import '../../api/properties/server/publications.js';
import '../../api/images/server/publications.js';
import '../../api/reviews/server/publications.js';
