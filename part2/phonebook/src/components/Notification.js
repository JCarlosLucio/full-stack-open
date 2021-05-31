const Notification = ({ message }) => {
  const style = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  if (!message) {
    return null;
  }

  return (
    <div
      style={{ ...style, color: message.type === 'success' ? 'green' : 'red' }}
    >
      {message.text}
    </div>
  );
};

export default Notification;
