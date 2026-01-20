import React, { useState } from 'react';
import Web3 from 'web3';
import CharityContract from '../../artifacts/Charity.json'; // Adjust the path as necessary

const CharityForm = () => {
    const [campaignName, setCampaignName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const web3 = new Web3(window.ethereum);
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
    const charityContract = new web3.eth.Contract(CharityContract.abi, contractAddress);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const accounts = await web3.eth.getAccounts();
        try {
            await charityContract.methods.createCampaign(campaignName, goalAmount, description).send({ from: accounts[0] });
            alert('Campaign created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create campaign. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create a New Charity Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Campaign Name:</label>
                    <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} required />
                </div>
                <div>
                    <label>Goal Amount (in ETH):</label>
                    <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Campaign'}
                </button>
            </form>
        </div>
    );
};

export default CharityForm;