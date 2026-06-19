# 🌍 Digital Clock - Multiple Time Zones

A beautiful, interactive web application that displays the current time across multiple time zones with local storage functionality.

## ✨ Features

- **Multiple Time Zones**: View current time across different time zones simultaneously
- **Add/Remove Zones**: Dynamically add or remove time zones
- **UTC Offset Display**: See UTC offset for each timezone
- **Local Storage**: Your selected timezones are automatically saved
- **Real-time Updates**: Clock updates every second
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Modern gradient design with smooth animations
- **Easy Search**: Add timezones by entering their IANA timezone identifiers

## 🚀 How to Use

1. Open `index.html` in your web browser
2. View the default time zones (New York, London, Tokyo, Sydney)
3. Add new time zones using the input field
4. Click "Remove" to delete a timezone
5. Click "Reset to Default" to restore original timezones

## 🌐 Popular Timezones

- **Americas**: America/New_York, America/Chicago, America/Denver, America/Los_Angeles, America/Anchorage
- **Europe**: Europe/London, Europe/Paris, Europe/Berlin, Europe/Madrid, Europe/Moscow
- **Asia**: Asia/Tokyo, Asia/Shanghai, Asia/Hong_Kong, Asia/Bangkok, Asia/Dubai, Asia/Kolkata, Asia/Singapore
- **Oceania**: Australia/Sydney, Australia/Melbourne, Pacific/Auckland

## 💾 Local Storage

Your selected timezones are automatically saved in your browser's local storage. The application will remember your preferences even after closing and reopening the browser.

## 🛠️ Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Dynamic functionality
- **Intl API**: Native timezone support
- **LocalStorage API**: Data persistence

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Customization

You can customize the appearance by modifying:
- Color gradients in `styles.css`
- Default timezones in `app.js` (DEFAULT_TIMEZONES array)
- Font sizes and spacing

## 🌟 Browser Support

Works on all modern browsers that support:
- ES6 JavaScript
- Intl.DateTimeFormat API
- CSS Grid
- LocalStorage API

## 📝 Notes

- Time zones use IANA timezone identifiers
- UTC offsets are automatically calculated
- All times are based on your device's current time
- The app updates automatically every second

---

**Created with ❤️ by Gabriel**