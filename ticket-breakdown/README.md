# Ticket Breakdown

- [Challenge](./challenge.md)

## Solution

### Assumptions
- We have a front-end project and a backend-project. The front-end communicate with the backend using API REST requests
- There is a front-end form to create/update the Facilities entities. 
- We need tickets to be divided by front-end and back-end tasks
- Each facility has its own custom-id per each agent and the custom-id should be unique per facility. 
- As default, agents has not a custom-id assigned to the facilities. 
- The custom-id should be created/updated/deleted from the facility's front-end dashboard setting for each facility.
- An API endpoint to query all the agents in the system is already in place 

### Tickets

#### Back-end
1. **Add ability to manage agent custom IDs per facility**
   - **Summary:** Create a new DB table and API endpoints to manage custom ids for each agent per facility
   - **Acceptance Criteria:**
     1. The facility can have just one `custom_id` per agent and the `custom_id` is unique inside the facility's 
       agents
     2. New API endpoints are created to list/create/update/delete custom id of the facility's agents.
   - **Implementation details:**
     - A new table should be created to store facility's agent custom details. This is an example of the name and fields:
       - Name: `facility_agent`
       - Fields:
           - `id` (PK)
           - `facility_id` (FK -> `facility`)
           - `agent_id` (FK -> `agent`)
           - `custom_id` (string type) 
       - Constraints:
         - Combination `facility_id` and `agent_id` should be unique
         - Combination `facility_id` and `custom_id` should be unique
   - **Time estimated**: 4 hours (with unit-test coverage)
2. **Include agent's custom-id in shift report**
   - **Summary:** The PDF shift report needs to show the agent's custom id for the facility queried.
   - **Acceptance Criteria:**
     1. The shift report should show a new colum with the agent's custom-id assigned for the facility. 
     2. If the agent hasn't a custom-id assigned to the facility, the field should be blank
   - **Implementation details:**
     - Modify the `getShiftsByFacility` function to include in the agent metadata the `custom-id` assigned to it for the
     facility. For it should query the table `facility_agent`
     - Modify the `generateReport` function to include a new column in the report that show the agent's `custom-id`. 
     If the agent hasn't a custom-id show a blank field 
   - **Time estimated**: 2 hours (with unit-test coverage)

### Front-end
1. **Modify the facility settings panel to manage custom-id of agents**
    - **Summary:** Each facility need to have the possibility to manage custom-ids for each agent
    - **Acceptance Criteria:**
        1. The facility settings dashboard has a new section to list/create/update/delete custom-ids for each 
        agent
    - **Implementation details:**
        - For the creation segment, show a list of agents in the system (Uses for this the existing endpoint available 
        to list agents). 
        - To list/create/update/delete the custom-ids use the new endpoints created in Back-end #1 ticket   
    - **Time estimated**: 8 hours (with unit-test coverage)