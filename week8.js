// Class 1 representing a player
class Player {
    constructor(name, position) {
        this.name = name; // Player's name
        this.position = position; // Player's position
    }

    // Method to describe the player
    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

// Class 2 representing a team
class Team {
    constructor(name) {
        this.name = name; // Team's name
        this.players = []; // Array to hold players in the team
    }

    // Method to add a player to the team
    addPlayer(Player) {
        if (Player instanceof Player) {
            this.players.push(Player); // Add player if it's an instance of Player
        } else {
            throw new Error(`You can only add an instance of player. Argument is not a player: ${Player}`);
        }
    }

    // Method to describe the team
    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

// Class 3 representing the menu for managing teams and players
class Menu {
    constructor() {
        this.teams = []; // Array to hold teams
        this.selectedTeam = null; // Currently selected team
    }

    // Method to start the menu
    start() {
        // showMainMenuOptions() Method: Displays the main menu options
        // and returns the user’s choice
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1': // Call createTeam method if selection is '1'
                    this.createTeam();
                    break;
                case '2': // Call viewTeam method if selection is '2'
                    this.viewTeam();
                    break;
                case '3': // Call deleteTeam method if selection is '3'
                    this.deleteTeam();
                    break;
                case '4': // Call displayTeams method if selection is '4'
                    this.displayTeams(); 
                    break;
                    
                default: // Set selection to 0 for any other input
                    selection = 0; 
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    // Method to show main menu options
    showMainMenuOptions() {
        // Exit the menu,  Allows the user to create a new team,
        //Allows the user to view, delete and display all and an existing team.

        //The prompt method displays a dialog box that prompts the user
        //for input. The text inside the backticks (`...`) is the message 
        //displayed in the dialog box.
        return prompt(`
            0) exit
            1) Create new team
            2) view team
            3) delete team
            4) display all teams
        `);
    }

    // Method to show team menu options
    showTeamMenuOptions(teamInfo) {
        // // Display a prompt with menu options and team information.
        return prompt(`
            0) back
            1) Create player
            2) delete player
            --------------------
            ${teamInfo}
        `);
    }

    // Method to display all teams
    displayTeams() {
        // This function constructs a string that lists all team names with their indices
        // // and then displays it in an alert dialog.
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    // Method to create a new team
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    // Method to view a specific team by entering its index.
    viewTeam() {
        // Prompt for Index: The method prompts the user to enter the index of the team they wish to view.
        let index = prompt('Enter the index of the team you wish to view:');
        // the code ensures that the index provided by the user corresponds 
        // to a valid position within the teams array
        if (index > -1 && index < this.teams.length)
             {  // Check if index is valid
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name 
                + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            //Team Description: Constructs a string with team and player details.
            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }

    // Method to delete a team
    deleteTeam() {
        // // Prompt the user to enter the index of the team they wish to delete
        let index = prompt('Enter the index of the team you wish to delete:');
        // Check if the entered index is within the valid range
        if (index > -1 && index < this.teams.length) {
            // // Remove the team at the specified index from the teams array
            this.teams.splice(index, 1);
        }
    }

    // Method to create a new player and add to the selected team.
    createPlayer() {
        // Prompt the user to enter the name and position of the new player
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        // Add the new player to the selected team's players array
        this.selectedTeam.players.push(new Player(name, position));
    }

    // Method to delete a player from selected team.
    deletePlayer() {
        // Prompt the user to enter the index of the player they wish to delete
        let index = prompt('Enter the index of the player you wish to delete:');
        // Check if the index is valid (within the range of the players array)
        if (index > -1 && index < this.selectedTeam.players.length) {
            // Remove the player at the specified index from the players array
            this.selectedTeam.players.splice(index, 1);
        }
    }
}

// Initialization of a new menu and start it
// This line creates a new instance of the Menu class and assigns it to the variable menu.
// Make sure the Menu class is defined somewhere in your code.
let menu = new Menu();
// This line calls the start method on the menu instance. 
//Ensure that the Menu class has a start method defined.
menu.start();
