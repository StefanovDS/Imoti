import React, { useState, ChangeEvent, FormEvent } from 'react';

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        area: '',
        propertyType: '',
        constructionYear: '',
        isCompleted: false,
        materialType: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitted Property Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Area:
                    <input type="text" name="area" value={formData.area} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Property Type:
                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="land">Land</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Construction Year:
                    <input type="number" name="constructionYear" value={formData.constructionYear} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Completed:
                    <input type="checkbox" name="isCompleted" checked={formData.isCompleted} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Material Type:
                    <select name="materialType" value={formData.materialType} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="brick">Brick</option>
                        <option value="panel">Panel</option>
                    </select>
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PropertyForm;