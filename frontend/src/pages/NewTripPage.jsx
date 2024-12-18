import React from 'react';
import NewTripCard from '../components/new-trip/NewTripCard';
import PageTitle from '../components/common/PageTitle';

function NewTripPage() {
    return (
        <>
            <PageTitle title={'Create a new trip'} />
            <NewTripCard />
        </>
    );
}

export default NewTripPage;
