import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const PropertySearchForm: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    listingType: 'sale' // 'sale' or 'rental'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'apartment',
    area: '',
    listingType: 'sale'
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/api/listings/search?${queryParams}`);
      if (response.ok) {
        const results = await response.json();
        navigate('/search-results', { state: { results } });
      } else {
        console.error('Search failed');
        alert('Търсенето неуспешно');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка при търсенето');
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    const imageUrls: string[] = [];

    for (const image of selectedImages) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await fetch('http://0.0.0.0:5000/api/upload-image', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          imageUrls.push(result.imageUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    return imageUrls;
  };

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // First upload images
      const imageUrls = await uploadImages();

      // Then create the listing with image URLs
      const response = await fetch('http://0.0.0.0:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          location: formData.location,
          type: formData.type,
          area: formData.area,
          listingType: formData.listingType,
          images: imageUrls
        }),
      });
      if (response.ok) {
        alert('Обявата е добавена успешно!');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          type: 'apartment',
          area: '',
          listingType: 'sale'
        });
        setSelectedImages([]);
        setShowAddForm(false);
      } else {
        alert('Неуспешно добавяне на обява');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Navigation onAddListingClick={() => {
        console.log('Add listing clicked, current state:', showAddForm);
        setShowAddForm(!showAddForm);
      }} />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">

          {/* Add Listing Form - appears directly below navigation */}
          {showAddForm && (
            <div id="addListingForm" className="pt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-green-500">
                <div className="mb-4 bg-yellow-100 border border-yellow-400 p-4 rounded-lg">
                  <p className="text-yellow-800 font-semibold">✅ SUCCESS: Add Listing Form is now visible!</p>
                </div>
                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                  Добави Нова Обява
                </h2>
                <form onSubmit={handleAddListing} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="addListingType" className="block text-sm font-semibold text-gray-700 mb-1">Тип обява</label>
                      <select
                        id="addListingType"
                        name="listingType"
                        value={formData.listingType}
                        onChange={handleFormInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      >
                        <option value="sale">За продажба</option>
                        <option value="rental">Под наем</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="addType" className="block text-sm font-semibold text-gray-700 mb-1">Тип имот</label>
                      <select
                        id="addType"
                        name="type"
                        value={formData.type}
                        onChange={handleFormInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      >
                        <option value="apartment">Апартамент</option>
                        <option value="house">Къща</option>
                        <option value="office">Офис</option>
                        <option value="shop">Магазин</option>
                        <option value="garage">Гараж</option>
                        <option value="land">Парцел</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="addLocation" className="block text-sm font-semibold text-gray-700 mb-1">Местоположение</label>
                      <input
                        id="addLocation"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleFormInputChange}
                        placeholder="Град, квартал, улица"
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="addPrice" className="block text-sm font-semibold text-gray-700 mb-1">Цена (лв.)</label>
                      <input
                        id="addPrice"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormInputChange}
                        placeholder="Цена в лева"
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="addArea" className="block text-sm font-semibold text-gray-700 mb-1">Площ (кв.м)</label>
                      <input
                        id="addArea"
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleFormInputChange}
                        placeholder="Площ в кв.м"
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="addTitle" className="block text-sm font-semibold text-gray-700 mb-1">Заглавие</label>
                      <input
                        id="addTitle"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormInputChange}
                        placeholder="Заглавие на обявата"
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="addDescription" className="block text-sm font-semibold text-gray-700 mb-1">Описание</label>
                    <textarea
                      id="addDescription"
                      name="description"
                      value={formData.description}
                      onChange={handleFormInputChange}
                      placeholder="Подробно описание на имота"
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 h-32"
                      required
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="col-span-full">
                    <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-1">
                      Снимки на имота
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0119.5 6v6a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 12V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                          >
                            <span>Качете снимки</span>
                            <input
                              id="images"
                              name="images"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">или плъзнете и пуснете</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF до 10MB</p>
                      </div>
                    </div>

                    {/* Selected Images Preview */}
                    {selectedImages.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Избрани снимки:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="h-20 w-full rounded-lg object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <p className="mt-1 text-xs text-gray-500 truncate">{image.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
                    >
                      Отказ
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Качва се...' : 'Добави обява'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search Form - now appears below the add form when open, or at top when add form is closed */}
          <div className="pt-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Търсене на имоти
              </h1>

              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="listingType" className="block text-sm font-medium text-gray-700 mb-2">
                      Тип обява
                    </label>
                    <select
                      id="listingType"
                      name="listingType"
                      value={searchParams.listingType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="sale">За продажба</option>
                      <option value="rental">Под наем</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Тип имот
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={searchParams.type}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Всички типове</option>
                      <option value="apartment">Апартамент</option>
                      <option value="house">Къща</option>
                      <option value="office">Офис</option>
                      <option value="shop">Магазин</option>
                      <option value="garage">Гараж</option>
                      <option value="land">Парцел</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Местоположение
                    </label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      value={searchParams.location}
                      onChange={handleInputChange}
                      placeholder="Град, квартал, улица"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена (лв.)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        value={searchParams.minPrice}
                        onChange={handleInputChange}
                        placeholder="От"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        value={searchParams.maxPrice}
                        onChange={handleInputChange}
                        placeholder="До"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Площ (кв.м)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minArea"
                        value={searchParams.minArea}
                        onChange={handleInputChange}
                        placeholder="От"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="number"
                        name="maxArea"
                        value={searchParams.maxArea}
                        onChange={handleInputChange}
                        placeholder="До"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    🔍 Търсене
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Map Image - always at the bottom */}
          <div className="mt-8 pb-8 flex justify-center">
            <img 
              src="/attached_assets/image_1753984636343.png" 
              alt="Карта на България" 
              className="max-w-md rounded-lg shadow-md"
              onError={(e) => {
                console.log('Image failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchForm;