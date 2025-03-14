import React from 'react';

class UserDetails extends React.Component {
  state = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      city: 'New York',
      country: 'USA'
    },
    isEditing: false
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    this.setState({ isEditing: false });
    // Here you would typically save the changes to a backend
    if (this.props.emitter) {
      this.props.emitter.emit('userDetailsUpdated', this.state.user);
    }
  };

  handleChange = (field, value) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }));
  };

  render() {
    const { user, isEditing } = this.state;

    return (
      <div style={{ padding: '2rem' }}>
        <h2>User Details</h2>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {Object.entries(user).map(([field, value]) => (
            <div key={field} style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: '1.1rem'
              }}>
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => this.handleChange(field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <div style={{ 
                  padding: '1rem 0',
                  fontSize: '1rem'
                }}>{value}</div>
              )}
            </div>
          ))}
          
          <button
            onClick={isEditing ? this.handleSave : this.handleEdit}
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Details'}
          </button>
        </div>
      </div>
    );
  }
}

export default UserDetails;