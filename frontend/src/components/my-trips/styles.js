export const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px',
    position: 'relative',
    gap: '1rem'
};

export const cardStyle = {
    width: '100%',
    maxWidth: '80rem',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    outline: '1px solid  var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 0,
    transition: 'box-shadow 0.3s ease',
    '@media (max-width: 600px)': {
        width: '90%',
        padding: '1rem'
    },
    ':hover': {
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'  // New shadow on hover
    }
};

export const cardContentStyle = {
    padding: '4px 4px 4px 4px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
    '@media (max-width: 1000px)': {
        flexDirection: 'column',
        padding: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1rem'
    }
};
