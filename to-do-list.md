# Running To-Do List / Clean Up: 

(Reminder: let's keep branches task specific and approve/merge PRs more frequently.)

- [ JE ] Fix Routes to show Album List on home page only. 

-  [ JE ] Build out sign up form to create new user. 

- [ JE ] Cart item count (0) needs to update for each line item.

- [ JE / ER ]  SLICE - User profile/ order history page needed: /user (change password, update info) local state, form to update info, put route. /user/history (view all past orders) .

- [ ER ] Checkout and Payment Process / Confirmation Page / Stripe
        - Available inventory needs to update in album details when item is purchased. 

- [ AK ] SLICE - Admin View and Functionality

- [ LK ] When you click on a search result, it should take you to the detail page but it isn’t currently working. 

- [ LK ] Clean up album data and default values, fix images if necessary (ongoing).     

- [ LK ] Cart Functionality Missing Pieces  
    - Every time we checkout, we need to create a new cart.
    - Currently, you can’t add to cart/remove from cart if you’re not logged in.
    - Need cart persistence when logging in, guest cart and user cart need to merge, then we delete the old carts. 