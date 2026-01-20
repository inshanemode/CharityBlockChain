import React, { useEffect, useState } from 'react';
import { getCharityCampaigns, getDonationStatistics } from '../utils/web3';
import DonationList from '../components/DonationList';
import CharityForm from '../components/CharityForm';

const Dashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [donationStats, setDonationStats] = useState({ totalDonations: 0, totalCampaigns: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const campaignsData = await getCharityCampaigns();
            const stats = await getDonationStatistics();
            setCampaigns(campaignsData);
            setDonationStats(stats);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Charity Dashboard</h1>
            <CharityForm />
            <h2>Donation Statistics</h2>
            <p>Total Donations: {donationStats.totalDonations}</p>
            <p>Total Campaigns: {donationStats.totalCampaigns}</p>
            <h2>Active Campaigns</h2>
            <DonationList campaigns={campaigns} />
        </div>
    );
};

export default Dashboard;