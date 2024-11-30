export const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px',
    position: 'relative'
};

export const cardStyle = {
    minWidth: 200,
    width: '25rem',
    boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
    marginTop: 3,
    border: '1px solid var(--color-lightgray)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 3,
    '@media (max-width: 600px)': {
        width: '18rem',
        padding: '1rem'
    }
};

export const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%'
};
