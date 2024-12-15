export const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px',
    position: 'relative',
    minWidth: '280px',
};

export const cardStyle = {
    minWidth: '280px',
    width: '20vw',
    height: 400,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    outline: '1px solid  var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 3,
    '@media (max-width: 600px)': {},
};

export const cardContentStyle = {
    display: 'flex',
    padding: '4px',
    flexDirection: 'column',
    gap: 1,
    width: '100%',
};
