
import { firestore, storage, auth } from '../firebase'; // Adjust path based on your file structure
import { doc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './itemmanagementadditems.css';

const saveAuctionItem = async (itemData, imageFile) => {
  try {
    // Step 1: Get the current authenticated user's username (or email if username is not available)
    const user = auth.currentUser;
    const username = user ? user.displayName || user.email : "Anonymous"; // Use displayName if available, fallback to email

    // Step 2: Upload the image to Firebase Storage
    const storageRef = ref(storage, `auctionItems/${imageFile.name}`);
    const uploadResult = await uploadBytes(storageRef, imageFile);

    // Step 3: Get the download URL for the image
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // Step 4: Prepare the auction item data including username
    const auctionItem = {
      name: itemData.name,
      initialPrice: itemData.initialPrice,
      timeSpan: itemData.timeSpan,
      quantity: itemData.quantity,
      highestBidder: itemData.highestBidder,
      imageUrl: imageUrl, // Store the image URL
      username: username, // Store the username
      timestamp: new Date(), // Timestamp of when the item was added
    };

    // Step 5: Store auction item in Firestore using auto-generated document ID
    const auctionItemsCollection = collection(firestore, 'auctionItems');
    await setDoc(doc(auctionItemsCollection), auctionItem); // Firestore generates a unique ID

    console.log('Auction item saved successfully!');
    return true; // Return true indicating success
  } catch (error) {
    console.error("Error saving auction item: ", error);
    return false; // Return false in case of failure
  }
};

// Function to be called when the submit button is clicked
const handleAddItemClick = async () => {
  // Collect item data from the input fields
  const itemName = document.getElementById('itemName').value.trim();
  const initialPrice = parseFloat(document.getElementById('initialPrice').value);
  const timeSpan = document.getElementById('timeSpan').value.trim();
  const quantity = parseInt(document.getElementById('quantity').value);
  const imageFile = document.getElementById('auctionImage').files[0];

  // Basic validation
  if (!itemName || isNaN(initialPrice) || !timeSpan || isNaN(quantity)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (!imageFile) {
    alert("Please upload an image for the item!");
    return;
  }

  const itemData = {
    name: itemName,
    initialPrice,
    timeSpan,
    quantity,
    highestBidder: 'None', // Placeholder, could be dynamic if required
  };

  const success = await saveAuctionItem(itemData, imageFile);

  if (success) {
    // Show success message
    alert("Item added successfully!");

    // Reset the input fields
    document.getElementById('itemName').value = '';
    document.getElementById('initialPrice').value = '';
    document.getElementById('timeSpan').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('auctionImage').value = '';
  } else {
    alert("There was an error adding the item. Please try again.");
  }
};

// Function for back button click
const handleBackButtonClick = () => {
  window.history.back(); // This will take the user back to the previous page
};

// JSX for the page (no form tag)
const ItemManagementAddItems = () => {
  return (
    <div className="add-item-page">
      <h2>Add New Auction Item</h2>

      <form>
        <div>
          <label>Item Name:</label>
          <input type="text" id="itemName" />
        </div>
        <div>
          <label>Initial Price:</label>
          <input type="number" id="initialPrice" />
        </div>
        <div>
          <label>Time Span (e.g., 7 days):</label>
          <input type="text" id="timeSpan" />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" id="quantity" />
        </div>
        <div>
          <label>Upload Item Image:</label>
          <input type="file" id="auctionImage" />
        </div>

        <button type="submit" onClick={handleAddItemClick}>Add Item</button>
        <button type="button" onClick={handleBackButtonClick}>Back</button>
      </form>
    </div>
  );
};


export default ItemManagementAddItems;