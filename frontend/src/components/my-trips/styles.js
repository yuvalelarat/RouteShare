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
    boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
    border: '1px solid var(--color-lightgray)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    padding: 0,
    '@media (max-width: 600px)': {
        width: '90%',
        padding: '1rem'
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
