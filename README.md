# Real Estate Listing App

This project is a React application for listing real estate properties. It provides a user-friendly interface for submitting and viewing property listings.

## Features

- Drag-and-drop interface for selecting property attributes such as city, area, and property type.
- Form for submitting property details, including construction year, completion status, and material type.
- Display of submitted property listings in a user-friendly format.

## Project Structure

```
real-estate-listing-app
├── src
│   ├── components
│   │   ├── DragAndDropField.tsx 
│   │   ├── PropertyForm.tsx
│   │   └── PropertyList.tsx
│   ├── App.tsx
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd real-estate-listing-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Use the drag-and-drop field to select property attributes.
- Fill out the property form with the required details.
- Submit the form to add the property to the list.
- View the submitted properties in the property list section.

## License

This project is licensed under the MIT License.