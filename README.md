# K Score  
CSCI 4831 Final Project by Landon Baxter  
## Video  
[Click here](https://youtu.be/ZlTfXoN3UI4) to view the presentation.  

## Explanation   


### What is K Score?  

K Score is a measure of a pitcher’s ability to produce strikeouts under pressure relative to the league at the time. Pitchers are faced with a variety of circumstances each game, but I found that there are few stats that attempt to weight a pitcher’s performance given the circumstances. Too many stats describe a player’s performance independent of the situation, which is a huge flaw in many basic baseball statistics. I created K Score to evaluate a pitcher and reward them for performing well when the circumstances are unfavorable.   

Before I worked out the details of the stat, I needed to define “pressure” for a pitcher. There were some good options, including the game’s score, opposing batter, and so on, but I opted to define pressure in terms of runners on base. When there are more runners on base, a strikeout is critical and can be the difference between several runs and the end of the inning. Therefore, the amount of pressure experienced by a pitcher has a direct relationship with the number of runners on base. There can be up to three runners on base, so I have defined three pressure levels: one runner on base, two runners on base, and three runners on base. To prevent the calculation from becoming too convoluted, I chose to group all base states where there are x number of runners on base into one (e.g., two runners on base includes one runner on first and one on second; one on first and one on third; and one on second and one on third). Additionally, I left out strikeouts with bases empty in order to keep the statistic focused on high pressure situations; having zero base runners means that a run is unlikely, so the base state is not worth considering here.    

### How is K Score calculated?  
![calc](https://i.imgur.com/8cuz1ge.png)
K Score is a sum that consists of three components, each of which corresponding to a different number of runners on base. A component is calculated by dividing the pitcher’s strikeout rate when there are x runners on base by the league average strikeout rate under the same conditions. Here, “strikeout rate” is obtained by dividing the player’s number of strikeouts in a given situation by the number of times that the player has been in that situation. For example, if some pitcher has 100 strikeouts with one runner on base and has pitched with one runner on base 500 times, the pitcher’s one runner strikeout rate would be 100/500 = 0.20. The same procedure is applied for two and three runners on base. Next, each component is multiplied by a weight that corresponds to the number of runners on base. Finally, K score is obtained by adding up the three weighted components.   

The three league averages were pre-calculated using Retrosheet (2010-2013) data; lgAverage one runner strikeout rate is 0.1801, lgAverage two runner strikeout rate is 0.1862, and lgAverage three runner strikeout rate is 0.1969.    

### What makes K Score good?    

Multiplying each component by the different weights assigns more importance to higher pressure circumstances, which is exactly the purpose of the statistic (to measure a pitcher’s ability to perform under pressure). This means pitchers with high strikeout rates when there are two or three runners on base will rank better than pitchers with only decent strikeout rates in similar high-pressure situations – as expected. Additionally, the inclusion of the league average in each component’s division means that a pitcher is scored according to the other pitchers in the league at the time. This is important because it eliminates any potentially significant pitching trends at the time. If an era is considered to be pitching friendly, one would expect each pitcher’s strikeout rates to be higher than other eras. However, the K scores of pitchers in this era would not be overly inflated because each pitcher’s K score is adjusted based on the league average at the time (which is also expected to be higher given favorable pitching conditions). The same would apply if an era was batting-heavy; the league average would be lower, so pitchers in this era would not be punished for having lower strikeout rates. This also means that pitchers and their K scores can potentially be compared across different eras (even when the eras in question saw much different pitching conditions).   

### What stats is K score related to?   

K score is unsurprisingly related to strikeouts and any other stats that measure strikeout rates (K/9, for example). Strikeouts and similar stats are simpler, though, and do not assign weights of any kind. There also is not an adjustment in these other stats. However, K score still has some sort of positive correlation with strikeouts (0.11), albeit a weak one. Another noteworthy stat is ERA, which is a popular and frequently referenced statistic. ERA measures the earned runs given up by a pitcher. I’m guessing that most of the runs that contribute to ERA occur because of hits with runners in scoring position. K score measures a pitcher’s ability to prevent hits with runners in scoring position (with strikeouts), so these stats ought to have some correlation. Indeed, there exists a correlation of -0.45 between ERA and K score. It makes sense that a pitcher with a high K score is likely giving up fewer runs; these pitchers are throwing strikeouts with runners in scoring position, leading to fewer runs allowed and higher strikeout rates under pressure. Lastly, I figured that hits allowed would also have some sort of relationship with K score. Throwing strikeouts and allowing hits are the two fundamental events in pitching, so they ought to be related in some way. It turns out that they have a relatively weak negative correlation (-0.18). The weakness of the correlation was surprising at first, but I eventually figured that hits allowed can be incredibly inconsistent given the semi-random nature of hits (this is related to the variance in batting average observed by Nate Silver in our readings). Having this degree of variance makes hits allowed a poor stat to compare against.    

I also would like to note that slugging percentage is related to this statistic in some ways. While they measure totally different things, the weights used in slugging percentage served as inspiration for weighting the different strikeout rates in K score.    


### What does K Score accomplish that other stats don't cover?  

K score is unique in a few ways. First, the use of weights and different levels of pressure (one runner on base, two runners on base, or three runners on base) allow K score to evaluate a pitcher based on clutchness / being able to perform in unfavorable circumstances. Unlike K score, most pitching stats are simple counting or averaging statistics that don’t take into consideration the circumstances of each event. Also, many stats are difficult to compare across eras. Because K score is a relative measure, one can use it to compare pitchers across eras.    

### Data

The data used in the calculation of K score came from the Retrosheet (2010-2013) database. I combined these results with data from the Lahman2016 database for the sake of comparing K score to other popular statistics. 

### Repo Information  

The following list describes the content of each file:
- kScoreVsOtherStats.ipynb: Jupyter notebook that was used to produce the correlation between K score and other stats as well as the diagrams seen on the website.   
- k_score.sql: SQL statements used to produce the data set and constants needed for calculating K score. Also contains a few queries whose output was used in the Jupyter notebook.  
- kscore.csv: CSV file containing the K scores for all pitchers in the league from 2010-2013, as well as the stats needed to calculate the k score itself.
- kscoreVSothers.csv: CSV file that extends the csv above with other stats. Used in the Jupyter notebook for calculating the correlations and diagrams.
- kscore_with_dml.csv: Same as kscore.csv, except it also has the DML (data manipulation language) statements for building the database on the website.
- pitcher.sql: SQL script used to insert data into the website's database. 
- pitchers_kscore.sql: SQL scripts used to populate a K score table in the Lahman database. This is then used in conjunction with the Pitching table in Lahman to produce the kscoreVSother.csv answer set.   

All other files are used to build the website.  

