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
    minWidth: 210,
    width: '20vw',
    height: 400,
    boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
    outline: '1px solid  var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 3,
    '@media (max-width: 600px)': {}
};

export const cardContentStyle = {
    display: 'flex',
    padding: '4px',
    flexDirection: 'column',
    gap: 1,
    width: '100%'
};
