package com.basic.helloworld.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.basic.helloworld.domain.Game
import com.basic.helloworld.domain.Player
import com.basic.helloworld.domain.PlayerScore
import com.basic.helloworld.viewmodel.PlayerViewModel

@Composable
fun GameCreationDialog(
    playerViewModel: PlayerViewModel,
    onDismiss: () -> Unit,
    onCreateGame: (Game) -> Unit
) {
    var gameName by remember { mutableStateOf("") }
    val players by playerViewModel.players.collectAsState()

    val selectedPlayers = remember { mutableStateListOf<Player>() }

    LaunchedEffect(Unit) {
        playerViewModel.loadPlayers()
    }

    AlertDialog(
        onDismissRequest = { onDismiss() },
        text = {
            Column(
                modifier = Modifier.fillMaxWidth()
            ) {
                // Game name input
                TextField(
                    value = gameName,
                    onValueChange = { gameName = it },
                    label = { Text("Game Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(32.dp))

                // Player selection
                Text(
                    text = "Players",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(16.dp))
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                ) {
                    items(players) { player ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(text = player.name, modifier = Modifier.weight(1f))
                            Checkbox(
                                checked = selectedPlayers.contains(player),
                                onCheckedChange = { isChecked ->
                                    if (isChecked) {
                                        selectedPlayers.add(player)
                                    } else {
                                        selectedPlayers.remove(player)
                                    }
                                }
                            )
                        }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (gameName.isNotBlank()) {
                        val playerScores = selectedPlayers.map { PlayerScore(player = it) }
                        val newGame = Game(
                            name = gameName,
                            players = playerScores
                        )
                        onCreateGame(newGame)
                        onDismiss()
                    }
                }
            ) {
                Text("Create")
            }
        },
        dismissButton = {
            Button(onClick = { onDismiss() }) {
                Text("Cancel")
            }
        }
    )
}

