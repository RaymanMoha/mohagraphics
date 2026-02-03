![Hbnb: AirBnB Clone overview](/img/hbnb-overview.png "Hbnb: AirBnB Clone website overview")

# Project Purpose and Goal

hbnb is a **full-stack AirBnB clone**, built in four iterative phases. The **final version (Phase 4)** introduced **client-side dynamic content loading** using a **custom RESTful API and jQuery**. This version significantly improved **performance, interactivity, and user experience** by fetching data dynamically instead of relying on static HTML pages.

The primary objectives of Phase 4 were to:

- **Request data from our custom API** and dynamically modify HTML elements.
- **Enhance UI interactivity** using jQuery Ajax for GET and POST requests.
- **Implement dynamic filters** for locations and amenities.
- **Improve page responsiveness** and **load times** by fetching and rendering only necessary data.

# Web Stack and Explanation

hbnb was built using a combination of **Python, Flask, and MySQL** for the backend and **HTML, CSS, JavaScript, and jQuery** for the frontend. The tech stack includes:

- **Backend:** Flask (Python 3.4.3), MySQL, SQLAlchemy, Gunicorn.
- **Frontend:** jQuery, AJAX, HTML, CSS (W3C Compliant).
- **Web Server:** Nginx with Gunicorn as WSGI.
- **Deployment:** Ubuntu 14.04 LTS.
- **API Documentation:** Swagger (flasgger==0.6.6).

The API was designed to **serve dynamic data** such as available places, user reviews, and filter options, ensuring that the website remained responsive and lightweight.

# Problems and Thought Process

The biggest challenge was ensuring that the web application loaded dynamically without requiring **full-page reloads**.

- **Dynamic Content Loading:** Instead of embedding data into static templates, we used jQuery to fetch and render places dynamically.
- **Filter Optimization:** Implemented efficient search filters that update the results **without reloading the page**.
- **API Status Check:** Integrated a **real-time API status indicator**, showing whether the backend service is active.

### **Example Enhancements**

- **Phase 1:** Static HTML with Jinja2 templates.
- **Phase 2:** Database integration with MySQL.
- **Phase 3:** RESTful API implementation.
- **Phase 4 (Final Version):** Dynamic client-side content loading using AJAX.

# Lessons Learned & Future Work

This project enhanced my **understanding of full-stack web development**, including API design, **server-side rendering vs. client-side rendering**, and **performance optimizations**. Future improvements could include:

- Migrating the **frontend to React.js** for better state management.
- **Caching API responses** for improved performance.
- **Integrating OAuth authentication** for a more secure login experience.

[Visit Repository](https://github.com/user/AirBnB_clone_v4)

