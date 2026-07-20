# Pixora
Pixora is a modern cloud-based photo management application that allows users to securely upload, organize, and manage their images using albums. Users can create albums, upload photos, mark favourites, add comments, and securely share albums with other registered users.

Authentication is powered by Google OAuth 2.0, enabling users to sign in seamlessly using their Google accounts.

---

## Demo Link
[Demo Link](https://pixora-3u5f.vercel.app/)

---

## Quick Start
```
git clone https://github.com/codingwithabhra/pixora
cd <your-repo>
npm install
npm run dev # or `npm start` / `yarn dev`
```

---

## Technologies
- React Js
- React Router
- Auth Middleware
- Google OAuth 2.0 login
- Redux toolkit
- Cloudinary
- Multer
- Node Js
- Express Js
- Mongodb
- Bootstrap

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app : [Watch Video](https://drive.google.com/drive/folders/107ecoZxkiJkOo_FGGzKHHwUJSeGC-Yns?usp=sharing)

---

## Features
**Sign In**
- User sign in with their email.

**Gallery**
- Display album, photos, favourite images and shared albums with user.
- Clicking on each displayed item takes user to respective pages.

**All Photos**
- View of list of images uploaded by user.
- Button for image upload.
- Clicking on any image takes user to respective image details page.

**Albums**
- List of albums created by user with name & description.
- Clicking on each displayed album takes user to respective album details page.
- Button for create a new album.

**Favourites**
- List of images marked favourite by user.
- Clicking on any favourite image takes user to respective image details page.

**Image Details**
- List of image details including image name, person in image, file size, tags, uploading date.
- Option to toggle between 'favourite' and 'not-favourite'.
- Buttons for edit images details or delete the emtire file with image.
- Option for displaying comment or add comment.

**Shared Albums**
- List of albums shared by user with others.

**Shared with me**
- List of albums shared with user by others.

**My Profile**
- Details of user including no of created and shared albums and also no of uploaded and favourite images.

---

## Api Reference

### **POST /api/auth/google**<br>
To provide user, option for log in using email<br>
Sample response:<br>
```
{{message, token, user{._id, name, email, profilePicture}}}
```

### **GET /api/auth/profile**<br>
To get complete list of user info from database<br>
Sample response:<br>
```
[{message, user{._id, email, name, profilePicture, password, createdAt, updatedAt}}]
```

### **GET /api/auth/all-users**<br>
To get all existing user details from database<br>
Sample response:<br>
```
[{message, user{._id, email, name, profilePicture, password, createdAt, updatedAt}},...]
```

### **GET /api/auth/myprofile**<br>
To get user's profile details from database<br>
Sample response:<br>
```
[{message, user{._id, email, name, profilePicture, myAlbums, sharedAlbums, totalphotos, favourites}},...]
```

### **POST /api/albums**<br>
Get complete album list from database<br>
Sample response:<br>
```
[{_id, name, description, person, isFavourite},...]
```

### **GET /api/albums**<br>
Get complete album list from database<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers, totalImages, ownerId{name, email, ._id}},...]
```

### **GET /api/albums/:albumId**<br>
To get particular album data from database<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers, totalImages, ownerId{name, email, ._id}},...]
```

### **GET /api/albums/shared/albumlist**<br>
To get shared album list details<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers{{name, email, ._id}}, totalImages, ownerId{name, email, ._id}},...]
```

### **DELETE /api/albums/:albumId**<br>
To delete particular album data from database<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers, totalImages, ownerId{name, email, ._id}},...]
```

### **POST /api/albums/:albumId/share**<br>
To send which album shared with which existing user into database<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers{name, email, ._id}, totalImages, ownerId{name, email, ._id}},...]
```

### **GET /api/albums/shared-with-me**<br>
To get all albums shared with user from database<br>
Sample response:<br>
```
[{_id, name, description, previewImages, sharedUsers{name, email, ._id}, totalImages, ownerId{name, email, ._id}},...]
```

### **GET /api/albums/:albumId/images**<br>
To get all images from database<br>
Sample response:<br>
```
[{_id, albumId, comments{text, commentedBy,._id}, filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **GET /api/albums/:albumId/images**<br>
To get all images from database<br>
Sample response:<br>
```
[{_id, albumId,  filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **POST /api/albums/:albumId/images/:imageId/favourites**<br>
To send image data on toggle between favourite and not favourite info into database<br>
Sample response:<br>
```
[{_id, albumId,  filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **GET /api/images/favourites**<br>
To get all favourite images from database<br>
Sample response:<br>
```
[{_id, albumId,  filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **POST /api/albums/:albumId/images/:imageId/comments**<br>
To send new comments of a image to database<br>
Sample response:<br>
```
[{_id, albumId, comments{text, commentedBy,._id}, filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **GET /api/albums/:albumId/images/:imageId/comments**<br>
To get all favourite images from database<br>
Sample response:<br>
```
[{_id, albumId, comments{text, commentedBy,._id}, filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **GET /api/albums/:albumId/images/:imageId**<br>
To get particular image from database<br>
Sample response:<br>
```
[{_id, albumId,  filePath, isFavourite, name, person, publicId, size, tags},...]
```

### **DELETE /api/albums/:albumId/images/:imageId**<br>
To delete particular image from database<br>
Sample response:<br>
```
[{_id, albumId,  filePath, isFavourite, name, person, publicId, size, tags},...]
```

---

## Contacts
For bugs or features request please reach out to patra.abhra97@gmail.com
