
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Catalog.css';
import catalogService from '../../services/catalogService';

const Catalog = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    catalogService.getProducts(),
                    catalogService.getCategories(),
                ]);

                const normalizedProducts = productsResponse.map((product) => {
                    const numericPrice = Number(product?.precio ?? product?.price ?? 0);
                    const parsedPrice = Number.isNaN(numericPrice) ? 0 : numericPrice;
                    const categoryId = product?.category_id ?? product?.category?.id ?? null;
                    const categoryName =
                        product?.category?.nombre ||
                        product?.category?.name ||
                        product?.category_name ||
                        '';

                    return {
                        id: product.id,
                        name: product.nombre || product.name || `Producto ${product.id}`,
                        description: product.descripcion || product.description || 'Sin descripción disponible.',
                        price: parsedPrice,
                        image:
                            product.imagen_url ||
                            product.image_url ||
                            product.image ||
                            'https://via.placeholder.com/300x300.png?text=Producto',
                        categoryId,
                        categoryName,
                        raw: product,
                    };
                });

                const normalizedCategories = categoriesResponse.map((categoryRecord) => ({
                    id: categoryRecord.id,
                    name: categoryRecord.nombre || categoryRecord.name || `Categoría ${categoryRecord.id}`,
                }));

                setProducts(normalizedProducts);
                setFilteredProducts(normalizedProducts);
                setCategories(normalizedCategories);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar los productos. Intenta nuevamente.');
                setProducts([]);
                setFilteredProducts([]);
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCatalogData();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (category !== 'all') {
            result = result.filter(
                (product) => String(product.categoryId) === String(category)
            );
        }

        const normalizedSearch = searchTerm.trim().toLowerCase();
        if (normalizedSearch) {
            result = result.filter((product) => {
                const haystack = `${product.name} ${product.description ?? ''}`.toLowerCase();
                return haystack.includes(normalizedSearch);
            });
        }

        result.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            }
            return b.price - a.price;
        });

        setFilteredProducts(result);
    }, [category, searchTerm, sortOrder, products]);

    const categoryOptions = [{ id: 'all', name: 'Todos' }, ...categories];

    return (
        <div className="catalog-container">
            <div className="catalog-title">
                <h2>Nuestro Catálogo</h2>
                <p>Descubre la belleza de la artesanía Boliviana</p>
            </div>

            <div className="controls-container">
                <div className="filter-container">
                    {categoryOptions.map((categoryOption) => (
                        <button
                            key={categoryOption.id}
                            className={category === categoryOption.id ? 'active' : ''}
                            onClick={() => setCategory(categoryOption.id)}
                        >
                            {categoryOption.name}
                        </button>
                    ))}
                </div>

                    <div className="search-sort-container">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="sort-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Precio: Ascendente</option>
                            <option value="desc">Precio: Descendente</option>
                        </select>
                    </div>
            </div>

            <div className="products-container">
                {isLoading && <p className="catalog-status">Cargando productos...</p>}
                {error && !isLoading && <p className="catalog-error">{error}</p>}
                {!isLoading && !error && filteredProducts.length === 0 && (
                    <p className="catalog-status">No se encontraron productos con los filtros aplicados.</p>
                )}
                {!isLoading &&
                    !error &&
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className="product-footer">
                                    <p className="price">Bs {Number(product.price).toFixed(2)}</p>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => onAddToCart(product)}
                                    >
                                        <FaShoppingCart style={{ marginRight: '8px' }} />
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Catalog;
