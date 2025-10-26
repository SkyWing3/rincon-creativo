
import React, { useEffect, useMemo, useState } from 'react';
import './Orders.css';
import OrderDetail from '../OrderDetail/OrderDetail';

const STATUS_CLASS_MAP = {
  delivered: 'status-completed',
  completed: 'status-completed',
  pending: 'status-pending',
  processing: 'status-pending',
  cancelled: 'status-cancelled',
  canceled: 'status-cancelled',
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

const Orders = ({ show, onClose, orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const safeOrders = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);

  useEffect(() => {
    if (!show) {
      setSelectedOrder(null);
    }
  }, [show]);

  useEffect(() => {
    setSelectedOrder(null);
  }, [safeOrders]);

  const getStatusClass = (status) => {
    if (!status) {
      return '';
    }

    const normalized = status.toLowerCase();
    return STATUS_CLASS_MAP[normalized] || '';
  };

  if (!show) {
    return null;
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-modal">
      <div className="orders-container">
        {selectedOrder ? (
          <OrderDetail order={selectedOrder} onBack={handleBack} />
        ) : (
          <>
            <div className="orders-header">
              <h1>Mis Pedidos</h1>
              <button onClick={onClose} className="close-btn">×</button>
            </div>
            {safeOrders.length === 0 ? (
              <div className="orders-list">
                <p className="orders-empty">No tienes pedidos registrados todavía.</p>
              </div>
            ) : (
              <div className="orders-list">
                {safeOrders.map(order => (
                  <div key={order.id} className="order-item" onClick={() => handleOrderClick(order)} style={{cursor: 'pointer'}}>
                    <div className="order-details">
                      <span>Pedido #{order.id}</span>
                      <p>Fecha: {formatDate(order.created_at)}</p>
                      <p>Total: {formatCurrency(order.total_amount)}</p>
                    </div>
                    <div className={`order-status ${getStatusClass(order.state)}`}>
                      {translateStatus(order.state)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
