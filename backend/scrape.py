import requests
import pandas as pd
from bs4 import BeautifulSoup

url = "https://cdd.publicsafety.gc.ca/prnt-eng.aspx?cultureCode=en-Ca&provinces=1%2c2%2c3%2c4%2c5%2c6%2c7%2c8%2c9%2c10%2c11%2c12%2c13&eventTypes=%27HE%27&normalizedCostYear=1&prnt=table"

# Get page content
response = requests.get(url)
response.raise_for_status()
soup = BeautifulSoup(response.text, "html.parser")

# Find all event divs
event_divs = soup.find_all("div", class_="itemTemplate")
all_events = []

for div in event_divs:
    table = div.find("table")
    if not table:
        continue

    event_data = {}
    for tr in table.find_all("tr"):
        th = tr.find("th")
        td = tr.find("td")
        if th and td:
            key = th.get_text(strip=True)
            value = td.get_text(strip=True)
            event_data[key] = value

    all_events.append(event_data)

# Convert to DataFrame
df = pd.DataFrame(all_events)

# Save to CSV
df.to_csv("canada_extreme_heat_raw.csv", index=False, encoding="utf-8-sig")

print("✅ Data saved to canada_extreme_heat_raw.csv")
print(df.head())
