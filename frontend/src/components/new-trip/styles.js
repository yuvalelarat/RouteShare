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
    width: '50rem',
    boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
    marginTop: 3,
    outline: '1px solid  var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 3,
    '@media (max-width: 900px)': {
        width: '80%',
        padding: '2rem'
    },
    '@media (max-width: 600px)': {
        width: '90%',
        padding: '1rem'
    }
};

export const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};
