package com.basic.helloworld.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.basic.helloworld.domain.Game
import com.basic.helloworld.viewmodel.GameViewModel
import com.basic.helloworld.viewmodel.PlayerViewModel

@Composable
fun ActiveGamesView(
    onGameSelected: (Game) -> Unit,
    gameViewModel: GameViewModel = GameViewModel(),
    playerViewModel: PlayerViewModel = PlayerViewModel()
) {
    val games by gameViewModel.games.collectAsState(initial = emptyList())
    val isLoading by gameViewModel.isLoading.collectAsState()
    var showCreationDialog by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        gameViewModel.loadGames()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        HeaderBar(onAddGameClicked = { showCreationDialog = true })

        when {
            isLoading -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }

            games.isEmpty() -> {
                EmptyStateMessage(message = "No active games found. Please create a new game.")
            }

            else -> {
                // Show the list of games when data is available
                GameList(games = games, onGameSelected = onGameSelected)
            }
        }
    }

    if (showCreationDialog) {
        GameCreationDialog(
            playerViewModel = playerViewModel,
            onDismiss = { showCreationDialog = false },
            onCreateGame = { newGame ->
                gameViewModel.createNewGame(newGame)
            }
        )
    }
}

@Composable
fun HeaderBar(onAddGameClicked: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = "Active Games",
            style = MaterialTheme.typography.titleLarge
        )
        Button(onClick = { onAddGameClicked() }, contentPadding = PaddingValues(8.dp)) {
            Text("+")
        }
    }
}

@Composable
fun EmptyStateMessage(message: String) {
    Text(
        text = message,
        style = MaterialTheme.typography.bodyMedium,
        modifier = Modifier.fillMaxWidth(),
        textAlign = TextAlign.Center
    )
}

@Composable
fun GameList(games: List<Game>, onGameSelected: (Game) -> Unit) {
    LazyColumn(
        modifier = Modifier.clip(RoundedCornerShape(16.dp)),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(games) { game ->
            GameCard(game = game, onGameSelected = onGameSelected)
        }
    }
}

@Composable
fun GameCard(game: Game, onGameSelected: (Game) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onGameSelected(game) }
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = game.name,
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.weight(1f)
            )
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Filled.Person,
                    contentDescription = "Players Icon",
                    tint = Color.Gray,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "${game.players.size}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}
