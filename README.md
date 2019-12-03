# Big-data-Yelp-Recommender-System
Class Project on Recommending a restaruant in Las Vegas
### *Week	Timeline*
* Week 1	Project Proposal
* Week 2	Initial Assessment, literature review
* Week 3	Data Exploration and Preprocessing
* Week 4	Data Analytics
* Week 5	Data Analytics
* Week 6	Data Analytics
* Week 7	Building the app - Website
* Week 8	Building the app - Website
* Week 9	Final changes and video
* Week 10	Final Presentation Preparation

### Dataset download from:
https://www.kaggle.com/yelp-dataset/yelp-dataset/download
The original datasource is:
https://www.yelp.com/dataset

### Exploratory Analysis
* Checking the complete dataset
* Creating a subset of the dataset as it is too large
  * Choosing the required variables
  * Choosing the required parameters for subset - City, Restuarants and Useful reviews
* Saving the subset into a new json file

### Recommendation Engine 
Different approaches where taekn
* Baseline Recommenation Model - Content-Based - TF-IDF Matrix to determine the similar restaurants
* Collaborative Filterning - KNN Model that uses the clustering algorithm to cluster users based on their restuarant preferences
* Hybrid Model - LightFM was used to create a Neural Network that recommended restaraunts based on various features of the user and restuarants

### Evaluation
It is hard to evaluate recommendation systems as there is nor definite restaurants. Precision at K was used as one of the mterics to measure the power of the recommendations made. 
* Baseline Model - Precision@K - 92%
* KNN model - Precision@K - 86%
* Neural Netwoek - Precision@K - 86.5%

### App 
http://rec-a-res.web.app/

![App Flow](https://github.com/snehathth/Big-data-Yelp-Recommender-System/blob/master/website/assets/Annotation%202019-12-03%20121607.png)
