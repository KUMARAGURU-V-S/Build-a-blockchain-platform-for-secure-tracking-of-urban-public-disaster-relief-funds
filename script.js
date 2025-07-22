const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // Replace after deployment
const contractABI = [
  {
    "inputs": [],
    "name": "getDocumentURL",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "cid", "type": "string" }],
    "name": "uploadDocumentCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = "Wallet: " + address;

    contract = new ethers.Contract(contractAddress, contractABI, signer);
    alert("✅ Connected to MetaMask");
  } else {
    alert("🦊 Install MetaMask");
  }
}

async function uploadCID() {
  const cid = document.getElementById("cidInput").value;
  if (!cid) return alert("❗Please enter a CID");

  try {
    const tx = await contract.uploadDocumentCID(cid);
    await tx.wait();
    alert("✅ CID Uploaded!");
  } catch (err) {
    alert("Error uploading CID: " + err.message);
  }
}

async function viewCID() {
  try {
    const url = await contract.getDocumentURL();
    document.getElementById("docURL").innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  } catch (err) {
    alert("Error fetching CID: " + err.message);
  }
}
