// Class representing a player
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

// Class representing a team
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

// Class representing the menu for managing teams and players
class Menu {
    constructor() {
        this.teams = []; // Array to hold teams
        this.selectedTeam = null; // Currently selected team
    }

    // Method to start the menu
    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    // Method to show main menu options
    showMainMenuOptions() {
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

    // Method to view a specific team
    viewTeam() {
        let index = prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name 
                + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

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
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    // Method to create a new player
    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    // Method to delete a player
    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }
}

// Create a new menu and start it
let menu = new Menu();
menu.start();
