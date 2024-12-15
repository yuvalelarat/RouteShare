export const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px',
    position: 'relative',
};

export const cardStyle = {
    minWidth: 200,
    width: '25rem',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    marginTop: 3,
    outline: '1px solid  var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 3,
    '@media (max-width: 600px)': {
        width: '18rem',
        padding: '1rem',
    },
};

export const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
};
