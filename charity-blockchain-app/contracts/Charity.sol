// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Charity {
    struct Campaign {
        uint id;
        string name;
        address payable creator;
        uint goal;
        uint totalDonations;
        bool isActive;
    }

    mapping(uint => Campaign) public campaigns;
    mapping(address => mapping(uint => uint)) public donations; // address => (campaignId => amount)
    uint public campaignCount;

    event CampaignCreated(uint id, string name, address creator, uint goal);
    event DonationReceived(uint campaignId, address donor, uint amount);
    event CampaignClosed(uint campaignId);
    event FundsWithdrawn(uint campaignId, address creator, uint amount);

    function createCampaign(string memory _name, uint _goal) public {
        require(_goal > 0, "Goal must be greater than 0");
        campaignCount++;
        campaigns[campaignCount] = Campaign(campaignCount, _name, payable(msg.sender), _goal, 0, true);
        emit CampaignCreated(campaignCount, _name, msg.sender, _goal);
    }

    function donate(uint _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.isActive, "Campaign is not active");
        require(msg.value > 0, "Donation must be greater than 0");

        campaign.totalDonations += msg.value;
        donations[msg.sender][_campaignId] += msg.value;
        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    function closeCampaign(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only the creator can close the campaign");
        require(campaign.isActive, "Campaign is already closed");

        campaign.isActive = false;
        emit CampaignClosed(_campaignId);
    }

    function withdrawFunds(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only the creator can withdraw funds");
        require(campaign.totalDonations > 0, "No funds to withdraw");

        uint amount = campaign.totalDonations;
        campaign.totalDonations = 0;
        
        campaign.creator.transfer(amount);
        emit FundsWithdrawn(_campaignId, campaign.creator, amount);
    }

    function getCampaign(uint _campaignId) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }
}