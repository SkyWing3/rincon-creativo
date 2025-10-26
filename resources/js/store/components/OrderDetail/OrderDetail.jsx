import React from 'react';
import './OrderDetail.css';

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return 'Bs 0.00';
  }

  const value = typeof amount === 'number' ? amount : parseFloat(amount);
  if (Number.isNaN(value)) {
    return `Bs ${amount}`;
  }

  return `Bs ${value.toFixed(2)}`;
};

const formatDate = (isoString) => {
  if (!isoString) {
    return 'Fecha no disponible';
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return date.toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const translateStatus = (status) => {
  if (!status) {
    return 'Desconocido';
  }

  const normalized = status.toLowerCase();
  switch (normalized) {
    case 'delivered':
    case 'completed':
      return 'Entregado';
    case 'pending':
    case 'processing':
      return 'Pendiente';
    case 'cancelled':
    case 'canceled':
      return 'Cancelado';
    default:
      return status;
  }
};

const DEFAULT_PRODUCT_IMAGE = 'https://via.placeholder.com/60';

const OrderDetail = ({ order, onBack }) => {
  if (!order) {
    return null;
  }

  const orderDetails = Array.isArray(order.details) ? order.details : [];

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <h2>Detalle del Pedido {order.id}</h2>
        <button onClick={onBack} className="back-btn">Volver a la lista</button>
      </div>
      <div className="order-summary">
        <p><strong>Fecha:</strong> {formatDate(order.created_at)}</p>
        <p><strong>Total:</strong> {formatCurrency(order.total_amount)}</p>
        <p><strong>Estado:</strong> {translateStatus(order.state)}</p>
        {order.global_discount !== undefined && order.global_discount !== null && (
          <p><strong>Descuento global:</strong> {order.global_discount}%</p>
        )}
      </div>
      <div className="product-list">
        <h3>Productos</h3>
        {orderDetails.length === 0 ? (
          <p>No se registraron productos para este pedido.</p>
        ) : (
          orderDetails.map(detail => {
            const subtotal = detail.subtotal_price !== undefined ? parseFloat(detail.subtotal_price) : null;
            const quantity = detail.quantity ?? 0;
            const unitPrice = detail.product?.price !== undefined && detail.product?.price !== null
              ? detail.product.price
              : (quantity > 0 && subtotal !== null && !Number.isNaN(subtotal) ? subtotal / quantity : null);

            const productName = detail.product?.name || `Producto #${detail.product_id}`;
            const productImage = detail.product?.image || DEFAULT_PRODUCT_IMAGE;

            return (
              <div key={detail.id} className="product-item">
                <div className="product-info">
                  <img src={productImage} alt={productName} className="product-image" />
                  <div className="product-details">
                    <span>{productName}</span>
                    <p>Precio unitario: {unitPrice !== null && !Number.isNaN(unitPrice) ? formatCurrency(unitPrice) : 'No disponible'}</p>
                  </div>
                </div>
                <div className="product-quantity">
                  <p>Cantidad: {quantity}</p>
                </div>
                <div className="product-price">
                  <p>Subtotal: {subtotal !== null && !Number.isNaN(subtotal) ? formatCurrency(subtotal) : 'No disponible'}</p>
                  {detail.unit_discount ? <p>Descuento unitario: {detail.unit_discount}%</p> : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
