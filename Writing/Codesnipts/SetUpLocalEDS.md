# [Set up local EDS]

## Description
2 containers, 4 processes.
### container 1: Postgres database
``` docker run --name postgres -e POSTGRES_DB=externaldatadb -p 15432:5432 -e POSTGRES_USER=localuserdb -e POSTGRES_PASSWORD=localpassworddb postgres:12
```
### container 2: Radis cache
``` docker run -p 6379:6379 -d redis
```
### process 1: 
``` harr dev --persistent &
```
### process 2: EDS 
``` start/myHarr
```
### process 3: Tunnel from AthenaNet to EDS
``` ssh -L 8080:localhost:8080 zan@athenaNet
```
### process 4: Tunnel for CORS
``` lcp --proxyUrl http://localhost:8080 --proxyPartial '' --port 57126
```
### process 5: Opptional; errors.
``` ssh preprod512506.athenahealth.com
err zan_2100_persistent | logcolor
err zan_2100 | logcolor
```


## Command/Code
```bash
# Your command or code here
```

## Notes
- Any important details or variations
- Common parameters or options

## Example
```bash
# Concrete example with real values
```

---

## Tags
`tag1` `tag2` `category`
