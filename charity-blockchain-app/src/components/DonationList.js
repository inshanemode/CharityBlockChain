import React, { useEffect, useState } from 'react';
import { getDonations } from '../utils/web3';

const DonationList = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            const donationData = await getDonations();
            setDonations(donationData);
        };

        fetchDonations();
    }, []);

    return (
        <div>
            <h2>Donation List</h2>
            <ul>
                {donations.map((donation, index) => (
                    <li key={index}>
                        <strong>Donor:</strong> {donation.donor} | 
                        <strong> Amount:</strong> {donation.amount} ETH | 
                        <strong> Campaign:</strong> {donation.campaign}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationList;