<?php include 'includes/session.php'; ?>
<?php include 'includes/header.php'; ?>

<body class="hold-transition skin-green layout-top-nav">
<div class="wrapper">
    <?php include 'includes/navbar.php'; ?>
    <div class="content-wrapper">
        <div class="container">
            <section class="content">
                <?php
                // Fetch the election details for the current voter
                $stmt = $conn->prepare("SELECT * FROM elections WHERE id = (SELECT election_id FROM voters WHERE id = ?)");
                $stmt->bind_param("i", $voter['id']);
                $stmt->execute();
                $election_query = $stmt->get_result();

                if ($election_query && $election_query->num_rows > 0) {
                    $election = $election_query->fetch_assoc();
                    // Set the election ID in the session
                    $_SESSION['election_id'] = $election['id'];

                    echo "<div class='text-center mb-8 px-4 animate__animated animate__fadeIn'>
                        <div class='border-4 border-green-500 bg-white rounded-xl shadow-lg py-6 px-3 max-w-4xl mx-auto'>
                            <h1 class='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-3'>
                                " . strtoupper($election['name']) . "
                            </h1>
                            <div class='max-w-lg mx-auto'>
                                <p class='text-gray-700 text-xl md:text-2xl font-medium'>Welcome! Your voice shapes our future</p>
                                <div class='h-2 w-32 bg-green-500 mx-auto mt-3 rounded-full'></div>
                            </div>
                        </div>
                    </div>";
                    
                    echo "<div class='bg-green-50 border-l-4 border-green-500 p-5 mb-8 rounded-lg shadow-sm max-w-3xl mx-auto'>
                        <div class='flex'>
                            <div class='flex-shrink-0'>
                                <i class='fa fa-info-circle text-green-500 text-xl'></i>
                            </div>
                            <div class='ml-3'>
                                <h4 class='text-lg font-medium text-green-800'>Voting Steps:</h4>
                                <ol class='list-decimal ml-5 mt-2 text-gray-700'>
                                    <li class='mb-1'>Review the candidates for each position</li>
                                    <li class='mb-1'>Tap on a candidate's card to select them</li>
                                    <li class='mb-1'>Choose 'Abstain' if you don't want to vote for a position</li>
                                    <li class='mb-1'>Review your choices and submit your votes</li>
                                    <li class='mb-1'>You cannot change your votes after submission</li>
                                </ol>
                            </div>
                        </div>
                    </div>";

                    // Check if the voter has already voted for this election
                    $stmt = $conn->prepare("SELECT * FROM votes WHERE election_id = ? AND voters_id = ?");
                    $stmt->bind_param("ii", $election['id'], $voter['id']);
                    $stmt->execute();
                    $voteCheckResult = $stmt->get_result();

                    // If the voter has already voted, fetch their votes
                    if ($voteCheckResult && $voteCheckResult->num_rows > 0) {
                        echo "<div class='bg-white rounded-xl shadow-md p-4 mb-6'>
                                <h3 class='text-xl font-bold text-center text-gray-800 mb-4'>You have already voted</h3>
                                <p class='text-center text-gray-600 mb-4'>Here are your selections:</p>";
                        
                        $stmt = $conn->prepare("
                            SELECT v.*, c.firstname, c.lastname, p.description AS position_description,
                                   pl.name AS partylist_name
                            FROM votes v
                            LEFT JOIN candidates c ON v.candidate_id = c.id
                            JOIN positions p ON v.position_id = p.position_id
                            LEFT JOIN partylists pl ON c.partylist_id = pl.partylist_id
                            WHERE v.voters_id = ? AND v.election_id = ?
                        ");
                        $stmt->bind_param("ii", $voter['id'], $election['id']);
                        $stmt->execute();
                        $votesResult = $stmt->get_result();

                        if ($votesResult && $votesResult->num_rows > 0) {
                            echo "<div class='space-y-3'>";
                            while ($vote = $votesResult->fetch_assoc()) {
                                if ($vote['candidate_id'] === NULL) {
                                    echo "<div class='bg-gray-100 rounded-lg p-3 flex items-center'>
                                            <div class='rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center mr-3'>
                                                <i class='fa fa-ban text-gray-500'></i>
                                            </div>
                                            <div>
                                                <p class='font-medium text-gray-800'>" . htmlspecialchars($vote['position_description']) . "</p>
                                                <p class='text-gray-500 text-sm'>ABSTAINED</p>
                                            </div>
                                        </div>";
                                } else {
                                    $partylist_info = !empty($vote['partylist_name']) ? " (" . $vote['partylist_name'] . ")" : "";
                                    echo "<div class='bg-green-50 rounded-lg p-3 flex items-center'>
                                            <div class='rounded-full bg-green-500 w-10 h-10 flex items-center justify-center mr-3'>
                                                <i class='fa fa-check text-white'></i>
                                            </div>
                                            <div>
                                                <p class='font-medium text-gray-800'>" . htmlspecialchars($vote['position_description']) . "</p>
                                                <p class='text-gray-700'>" . htmlspecialchars($vote['firstname'] . " " . $vote['lastname'] . $partylist_info) . "</p>
                                            </div>
                                        </div>";
                                }
                            }
                            echo "</div>";
                            
                            // Feedback button
                            echo "<div class='text-center mt-6'>
                                    <a href='feedback.php' class='inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition duration-200'>
                                        <i class='fa fa-comments mr-2'></i> Give Feedback
                                    </a>
                                  </div>";
                        } else {
                            echo "<div class='alert alert-warning'>No votes found for this election.</div>";
                        }
                        echo "</div>"; // Close the container div
                    } else {
                        // Voting logic for those who haven't voted
                        if (isset($_POST['submit_votes'])) {
                            $hasError = false; // Flag to check for errors during insertion

                            // Loop through each position
                            $stmt = $conn->prepare("SELECT position_id FROM positions WHERE election_id = ?");
                            $stmt->bind_param("i", $election['id']);
                            $stmt->execute();
                            $positions_result = $stmt->get_result();

                            while ($position = $positions_result->fetch_assoc()) {
                                $position_id = $position['position_id'];

                                // Check if this position was abstained
                                if (isset($_POST['abstain']) && in_array($position_id, $_POST['abstain'])) {
                                    // Insert NULL for candidate_id to represent abstention
                                    $insert_stmt = $conn->prepare("INSERT INTO votes (election_id, voters_id, candidate_id, position_id) VALUES (?, ?, NULL, ?)");
                                    $insert_stmt->bind_param("iii", $election['id'], $voter['id'], $position_id);
                                    if (!$insert_stmt->execute()) {
                                        $hasError = true;
                                        break;
                                    }
                                }
                                // Check if candidates were selected for this position
                                elseif (isset($_POST['candidates'][$position_id])) {
                                    $selected_candidates = $_POST['candidates'][$position_id];

                                    // Insert each selected candidate's vote
                                    foreach ($selected_candidates as $candidate_id) {
                                        if (!empty($candidate_id)) { // Only insert if candidate_id is not empty
                                            $insert_stmt = $conn->prepare("INSERT INTO votes (election_id, voters_id, candidate_id, position_id) VALUES (?, ?, ?, ?)");
                                            $insert_stmt->bind_param("iiii", $election['id'], $voter['id'], $candidate_id, $position_id);
                                            if (!$insert_stmt->execute()) {
                                                $hasError = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }

                            // Display submission result
                            if (!$hasError) {
                                echo "<div class='fixed top-0 left-0 w-full flex items-center justify-center z-50 bg-green-100 bg-opacity-90 py-4 shadow-lg' id='successAlert'>
                                        <div class='bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md w-full border-l-4 border-green-500'>
                                            <div class='flex items-center mb-4'>
                                                <div class='flex-shrink-0'>
                                                    <i class='fa fa-check-circle text-green-500 text-3xl'></i>
                                                </div>
                                                <div class='ml-3'>
                                                    <h3 class='text-lg font-semibold text-gray-800'>Success!</h3>
                                                    <p class='text-gray-600'>Your votes have been submitted successfully!</p>
                                                </div>
                                            </div>
                                            <p class='text-sm text-gray-500 mt-2'>Redirecting to feedback form...</p>
                                        </div>
                                      </div>";

                                echo "<script>
                                        setTimeout(function() {
                                            window.location.href = 'feedback.php';
                                        }, 1500);
                                      </script>";

                                // Fetch and display the submitted votes
                                $stmt = $conn->prepare("
                                    SELECT v.*, c.firstname, c.lastname, p.description AS position_description,
                                           pl.name AS partylist_name
                                    FROM votes v
                                    LEFT JOIN candidates c ON v.candidate_id = c.id
                                    JOIN positions p ON v.position_id = p.position_id
                                    LEFT JOIN partylists pl ON c.partylist_id = pl.partylist_id
                                    WHERE v.voters_id = ? AND v.election_id = ?
                                ");
                                $stmt->bind_param("ii", $voter['id'], $election['id']);
                                $stmt->execute();
                                $votesResult = $stmt->get_result();

                                if ($votesResult && $votesResult->num_rows > 0) {
                                    echo "<div class='mt-8 mb-6'>
                                            <h3 class='text-xl font-bold text-center mb-4'>Your Votes:</h3>
                                            <div class='space-y-3'>";
                                    while ($vote = $votesResult->fetch_assoc()) {
                                        if ($vote['candidate_id'] === NULL) {
                                            echo "<div class='bg-gray-100 rounded-lg p-3 flex items-center'>
                                                    <div class='rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center mr-3'>
                                                        <i class='fa fa-ban text-gray-500'></i>
                                                    </div>
                                                    <div>
                                                        <p class='font-medium text-gray-800'>" . htmlspecialchars($vote['position_description']) . "</p>
                                                        <p class='text-gray-500 text-sm'>ABSTAINED</p>
                                                    </div>
                                                </div>";
                                        } else {
                                            $partylist_info = !empty($vote['partylist_name']) ? " (" . $vote['partylist_name'] . ")" : "";
                                            echo "<div class='bg-green-50 rounded-lg p-3 flex items-center'>
                                                    <div class='rounded-full bg-green-500 w-10 h-10 flex items-center justify-center mr-3'>
                                                        <i class='fa fa-check text-white'></i>
                                                    </div>
                                                    <div>
                                                        <p class='font-medium text-gray-800'>" . htmlspecialchars($vote['position_description']) . "</p>
                                                        <p class='text-gray-700'>" . htmlspecialchars($vote['firstname'] . " " . $vote['lastname'] . $partylist_info) . "</p>
                                                    </div>
                                                </div>";
                                        }
                                    }
                                    echo "</div></div>";
                                }
                            } else {
                                echo "<div class='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md'>
                                        <div class='flex'>
                                            <div class='flex-shrink-0'>
                                                <i class='fa fa-times-circle text-red-500'></i>
                                            </div>
                                            <div class='ml-3'>
                                                <p class='font-medium'>Error submitting your votes. Please try again.</p>
                                            </div>
                                        </div>
                                    </div>";
                            }
                        } else {
                            // Fetch and display candidates for each position in the current election
                            $stmt = $conn->prepare("SELECT * FROM positions WHERE election_id = ? ORDER BY position_id ASC");
                            $stmt->bind_param("i", $election['id']);
                            $stmt->execute();
                            $positions_query = $stmt->get_result();
                            echo "<form method='post' id='voteForm'>"; // Form tag added here

                            while ($position = $positions_query->fetch_assoc()) {
                                echo "<div class='mb-10 max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border-2 border-green-300' id='" . htmlspecialchars($position['position_id']) . "'>
                                        <div class='bg-gradient-to-r from-green-600 to-green-400 px-5 py-6 text-center'>
                                            <h3 class='text-white font-bold text-2xl md:text-3xl'>" . htmlspecialchars($position['description']) . "</h3>
                                        </div>
                                        <div class='p-5'>";

                                // Fetch candidates for the current position
                                $stmt = $conn->prepare("
                                    SELECT c.id, c.firstname, c.lastname, c.photo, p.name AS partylist_name
                                    FROM candidates c
                                    LEFT JOIN partylists p ON c.partylist_id = p.partylist_id
                                    WHERE c.position_id = ?
                                ");
                                $stmt->bind_param("i", $position['position_id']);
                                $stmt->execute();
                                $candidates_query = $stmt->get_result();

                                // Check if there are candidates
                                if ($candidates_query && $candidates_query->num_rows > 0) {
                                    echo "<div class='mb-3 text-center'>
                                            <span class='inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
                                                <i class='fa fa-info-circle mr-1'></i> Max selections allowed: <strong>" . htmlspecialchars($position['max_vote']) . "</strong>
                                            </span>
                                          </div>";
                                    echo "<div class='candidate-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>"; // Mobile-responsive grid

                                    while ($candidate = $candidates_query->fetch_assoc()) {
                                        $partylist_display = !empty($candidate['partylist_name']) ?
                                            "<div class='bg-gray-100 text-gray-800 px-3 py-2 rounded-lg font-medium mt-2 text-base'>" . htmlspecialchars($candidate['partylist_name']) . "</div>" : "";

                                        echo "<div class='candidate-card bg-white border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg' 
                                            onclick='selectCandidate(this, " . htmlspecialchars($candidate['id']) . ", " . htmlspecialchars($position['position_id']) . ", " . htmlspecialchars($position['max_vote']) . ")'>
                                            <div class='relative pt-[100%]'>
                                                <img src='sub/" . htmlspecialchars($candidate['photo']) . "' 
                                                    class='absolute inset-0 w-full h-full object-cover candidate-img'>
                                                <div class='hidden absolute top-3 right-3 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center check-icon shadow-lg'>
                                                    <i class='fa fa-check text-white'></i>
                                                </div>
                                            </div>
                                            <div class='p-4 text-center'>
                                                <h4 class='font-bold text-gray-800 text-xl md:text-2xl'>" . htmlspecialchars($candidate['firstname'] . " " . $candidate['lastname']) . "</h4>
                                                <div class='mt-2'>" . $partylist_display . "</div>
                                                <button type='button' 
                                                        class='mt-3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 platform-btn'
                                                        onclick='event.stopPropagation(); viewPlatform(" . htmlspecialchars($candidate['id']) . ", \"" . htmlspecialchars(addslashes($candidate['firstname'] . " " . $candidate['lastname'])) . "\")'>
                                                    <i class='fa fa-list-alt mr-1'></i> View Platform
                                                </button>
                                            </div>
                                            <input type='hidden' name='candidates[" . htmlspecialchars($position['position_id']) . "][]' value=''>
                                        </div>";
                                    }

                                    echo "</div>"; // Close the parent container

                                    // Add abstain option with cleaner styling
                                    echo "<div class='mt-5 p-6 bg-gray-50 rounded-lg border-2 border-gray-200 text-center'>
                                            <label class='abstain-option inline-flex items-center cursor-pointer'>
                                                <input type='checkbox' name='abstain[]' value='" . htmlspecialchars($position['position_id']) . "'
                                                       class='form-checkbox h-6 w-6 text-red-500 rounded focus:ring-0'
                                                       onchange='handleAbstain(this, " . htmlspecialchars($position['position_id']) . ")'>
                                                <span class='ml-3 text-gray-700 font-bold text-lg'>ABSTAIN from voting for this position</span>
                                            </label>
                                            <div class='text-sm text-gray-600 mt-3 bg-green-50 p-2 rounded-md inline-block font-medium'>Max selections allowed: <span class='font-bold'>" . htmlspecialchars($position['max_vote']) . "</span></div>
                                          </div>";
                                } else {
                                    echo "<div class='text-center p-6 text-gray-500'>No candidates found for this position.</div>";
                                }

                                echo "          </div>
                                            </div>";
                            }

                            // Display voting button - floating button for mobile
                            echo "<div class='fixed bottom-6 right-6 z-20'>
                                    <button type='button' class='bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-center transition duration-200 transform hover:scale-105' onclick='return showConfirmation()'>
                                        <i class='fa fa-check-square-o mr-2'></i> Review & Submit
                                    </button>
                                  </div>";

                            echo "</form>"; // Form tag closing added here
                        }
                    }
                } else {
                    echo "<div class='text-center py-12'>
                            <div class='text-5xl text-gray-300 mb-4'><i class='fa fa-info-circle'></i></div>
                            <h1 class='text-2xl font-bold text-gray-700 mb-2'>No Election Found</h1>
                            <p class='text-gray-500'>There are no active elections for you at this time.</p>
                          </div>";
                }
                ?>
            </section>
        </div>
    </div>
    <?php include 'includes/footer.php'; ?>
</div>
<?php include 'includes/scripts.php'; ?>
<!-- Your JavaScript code -->
<script>
// Update the showConfirmation function to create larger review elements
function showConfirmation() {
    let voteReviewList = document.getElementById("voteReviewList");
    voteReviewList.innerHTML = "";

    let selectedCandidates = document.querySelectorAll(".selected");
    let abstainOptions = document.querySelectorAll("input[name='abstain[]']:checked");

    // Check if at least one candidate is selected or abstain is chosen
    if (selectedCandidates.length === 0 && abstainOptions.length === 0) {
        // Modern toast alert
        const toast = document.createElement('div');
        toast.className = 'fixed top-0 left-0 w-full flex items-center justify-center z-50 bg-opacity-80 p-4';
        toast.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl p-4 mx-4 max-w-md w-full border-l-4 border-yellow-500 flex items-center">
                <div class="flex-shrink-0 text-yellow-500">
                    <i class="fa fa-exclamation-triangle text-xl"></i>
                </div>
                <div class="ml-3">
                    <p class="text-gray-700">Please select at least one candidate or choose to abstain.</p>
                </div>
                <button class="ml-auto text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
        
        return;
    }

    // Get all positions - Fix the selector to correctly find position containers
    const positions = {};
    document.querySelectorAll("div[id]").forEach(position => {
        // Check if it's a position container (has a numeric ID and contains the position heading)
        if (position.id && !isNaN(position.id) && position.querySelector(".bg-gradient-to-r h3")) {
            const positionHeading = position.querySelector(".bg-gradient-to-r h3");
            if (positionHeading) {
                positions[position.id] = {
                    name: positionHeading.textContent.trim(),
                    maxVote: position.querySelector(".text-sm.text-gray-600 .font-bold")?.textContent || "1"
                };
            }
        }
    });

    // Group votes by position
    const votesByPosition = {};
    
    // Process selected candidates
    selectedCandidates.forEach(candidate => {
        let candidateName = candidate.querySelector("h4").textContent;
        let partylistElement = candidate.querySelector(".bg-gray-100");
        let partylistInfo = partylistElement ? partylistElement.textContent : "";
        let candidateImg = candidate.querySelector("img").src;
        
        // Get position information - Fix to properly get the closest container with ID
        let positionContainer = candidate.closest("div[id]");
        if (positionContainer) {
            let positionId = positionContainer.id;
            let positionName = positions[positionId]?.name || "Unknown Position";
            
            // Initialize position group if not exists
            if (!votesByPosition[positionName]) {
                votesByPosition[positionName] = [];
            }

            // Add candidate to position group
            votesByPosition[positionName].push({
                type: 'candidate',
                name: candidateName,
                partylist: partylistInfo,
                image: candidateImg
            });
        }
    });

    // Process abstained positions
    abstainOptions.forEach(option => {
        let positionId = option.value;
        let positionName = positions[positionId]?.name || "Unknown Position";
        
        // Initialize position group if not exists
        if (!votesByPosition[positionName]) {
            votesByPosition[positionName] = [];
        }

        // Add abstain to position group
        votesByPosition[positionName].push({
            type: 'abstain'
        });
    });

    // Sort positions alphabetically and render the vote review list
    Object.keys(votesByPosition).sort().forEach(positionName => {
        // Create position header
        let positionHeader = document.createElement("div");
        positionHeader.className = 'bg-green-50 p-4 border-b-2 border-green-200';
        positionHeader.innerHTML = `
            <h3 class="font-bold text-xl text-green-800">${positionName}</h3>
        `;
        voteReviewList.appendChild(positionHeader);
        
        // Add selected candidates or abstain for this position
        votesByPosition[positionName].forEach(vote => {
            let listItem = document.createElement("div");
            
            if (vote.type === 'candidate') {
                listItem.className = 'flex items-center p-5 border-b border-gray-100';
                listItem.innerHTML = `
                    <div class="w-20 h-20 rounded-full overflow-hidden mr-5 bg-gray-100 flex-shrink-0 border-2 border-green-200">
                        <img src="${vote.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                        <p class="font-bold text-xl text-gray-800">${vote.name}</p>
                        <p class="text-gray-600 text-lg">${vote.partylist || 'Independent'}</p>
                    </div>
                    <div class="bg-green-100 rounded-full p-2 flex-shrink-0">
                        <i class="fa fa-check text-green-600 text-xl"></i>
                    </div>
                `;
            } else {
                listItem.className = 'flex items-center p-5 border-b border-gray-100 bg-gray-50';
                listItem.innerHTML = `
                    <div class="w-20 h-20 rounded-full bg-gray-200 mr-5 flex items-center justify-center flex-shrink-0 border-2 border-gray-300">
                        <i class="fa fa-ban text-gray-400 text-3xl"></i>
                    </div>
                    <div class="flex-grow">
                        <p class="font-bold text-xl text-gray-800">ABSTAINED</p>
                        <p class="text-gray-600 text-lg">No selection made for this position</p>
                    </div>
                    <div class="bg-gray-200 rounded-full p-2 flex-shrink-0">
                        <i class="fa fa-circle-o text-gray-500 text-xl"></i>
                    </div>
                `;
            }
            
            voteReviewList.appendChild(listItem);
        });
    });

    $("#confirmationModal").modal("show");  // Show modal
}
</script>

<script>
function confirmVote() {
    return confirm("Are you sure you want to submit your votes? Once submitted, you cannot change your selections.");
}
</script>

<script>
function selectCandidate(element, candidateId, positionId, maxVote) {
    // Ignore clicks on the platform button or its children
    if (event && (event.target.classList.contains('platform-btn') || 
        event.target.closest('.platform-btn'))) {
        return;
    }
    
    // Uncheck abstain option if a candidate is selected
    let abstainCheckbox = document.querySelector(`input[name='abstain[]'][value='${positionId}']`);
    if (abstainCheckbox && abstainCheckbox.checked) {
        abstainCheckbox.checked = false;
    }

    let positionContainer = document.getElementById(positionId);
    let selectedCandidates = positionContainer.querySelectorAll(".selected");

    if (maxVote === 1) {
        // Single vote per position (radio button functionality)
        selectedCandidates.forEach(c => {
            c.classList.remove("selected");
            c.querySelector("input").value = "";
            c.querySelector(".check-icon").classList.add("hidden");
            
            // Reset visual appearance
            c.classList.remove("border-green-500");
            c.classList.add("border");
        });
    } else if (selectedCandidates.length >= maxVote && !element.classList.contains("selected")) {
        // Show warning but don't prevent deselection
        const toast = document.createElement('div');
        toast.className = 'fixed top-0 left-0 w-full flex items-center justify-center z-50 bg-opacity-80 p-4';
        toast.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl p-4 mx-4 max-w-md w-full border-l-4 border-yellow-500 flex items-center">
                <div class="flex-shrink-0 text-yellow-500">
                    <i class="fa fa-exclamation-triangle text-xl"></i>
                </div>
                <div class="ml-3">
                    <p class="text-gray-700">You can only select up to ${maxVote} candidate(s) for this position.</p>
                </div>
                <button class="ml-auto text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
        
        return;
    }

    // Toggle selection state
    if (element.classList.contains("selected")) {
        // Deselect if already selected
        element.classList.remove("selected");
        element.classList.remove("border-green-500");
        element.classList.add("border");
        element.querySelector("input").value = "";
        element.querySelector(".check-icon").classList.add("hidden");
    } else {
        // Select the candidate
        element.classList.add("selected");
        element.classList.remove("border");
        element.classList.add("border-green-500");
        element.querySelector("input").value = candidateId;
        element.querySelector(".check-icon").classList.remove("hidden");
    }
}
</script>

<script>
function handleAbstain(checkbox, positionId) {
    let positionContainer = document.getElementById(positionId);
    let candidates = positionContainer.querySelectorAll(".candidate-card");

    if (checkbox.checked) {
        // If abstain is checked, deselect all candidates for this position
        candidates.forEach(candidate => {
            candidate.classList.remove("selected");
            candidate.classList.remove("border-green-500");
            candidate.classList.add("border");
            candidate.querySelector("input").value = "";
            
            // Hide check icon
            let checkIcon = candidate.querySelector(".check-icon");
            if (checkIcon) {
                checkIcon.classList.add("hidden");
            }
        });
    }
}
</script>

<script>
// Function to view a candidate's platform
function viewPlatform(candidateId, candidateName) {
    // Set the modal title
    document.getElementById('platformModalTitle').textContent = candidateName + "'s Platform";
    
    // Clear previous content
    document.getElementById('platformContent').innerHTML = `
        <div class="p-12 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    `;
    
    // Show the modal
    $('#platformModal').modal('show');
    
    // Fetch the platform data from the server
    fetch(`get_platform.php?candidate_id=${candidateId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Successful response
            if (data.success) {
                document.getElementById('platformContent').innerHTML = `
                    <div class="bg-white p-6 rounded-lg">
                        <div class="text-gray-700 leading-relaxed">
                            ${data.platform.vision || 'No platform statement provided.'}
                        </div>
                    </div>
                `;
            } else {
                // Error from the server
                document.getElementById('platformContent').innerHTML = `
                    <div class="text-center py-8">
                        <h3 class="text-xl font-bold text-gray-700 mb-3">No Platform Details</h3>
                        <p class="text-gray-500">
                            <i class="fa fa-info-circle mr-2"></i>This candidate has not provided any platform details yet.
                        </p>
                    </div>
                `;
            }
        })
        .catch(error => {
            // Network or other error
            document.getElementById('platformContent').innerHTML = `
                <div class="bg-white p-6 rounded-lg text-center">
                    <h3 class="font-bold text-gray-700 text-lg mb-2">Error Loading Platform</h3>
                    <p class="text-gray-600">
                        <i class="fa fa-refresh mr-2"></i>There was a problem loading this candidate's platform. Please try again later.
                    </p>
                </div>
            `;
            console.error('Error fetching platform:', error);
        });
}
</script>

<script>
function confirmLogout() {
    Swal.fire({
        title: 'Ready to Leave?',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#6B7280',
        confirmButtonText: '<i class="fa fa-sign-out mr-2"></i>Yes, Logout',
        cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancel',
        background: '#fff',
        iconColor: '#3B82F6',
        customClass: {
            confirmButton: 'px-4 py-2 rounded-lg',
            cancelButton: 'px-4 py-2 rounded-lg',
            title: 'text-xl font-bold text-gray-800',
            popup: 'rounded-lg shadow-lg'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Show a brief loading message
            Swal.fire({
                title: 'Logging out...',
                text: 'Please wait',
                timer: 800,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            }).then(() => {
                // Redirect to logout page
                window.location.href = 'logout.php';
            });
        }
    });
}
</script>

<script>
// Add this function to handle vote submission
function confirmSubmitVotes() {
    // Close the modal first
    $('#confirmationModal').modal('hide');
    
    // Prevent double submission
    if (window.isSubmitting) return;
    
    Swal.fire({
        title: 'Submit Your Votes?',
        text: 'Once submitted, you cannot change your selections.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#6B7280',
        confirmButtonText: '<i class="fa fa-check-circle mr-2"></i>Yes, Submit Now',
        cancelButtonText: '<i class="fa fa-times-circle mr-2"></i>Review Again',
        reverseButtons: true,
        focusCancel: true,
        background: '#fff',
        iconColor: '#10B981',
        customClass: {
            confirmButton: 'px-4 py-2 rounded-lg',
            cancelButton: 'px-4 py-2 rounded-lg',
            title: 'text-xl font-bold text-gray-800',
            popup: 'rounded-lg shadow-lg'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Mark as submitting to prevent double clicks
            window.isSubmitting = true;
            
            // Show loading state
            Swal.fire({
                title: 'Submitting...',
                text: 'Please wait while your votes are being recorded',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });
            
            // Add a hidden field for submission
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'submit_votes';
            hiddenInput.value = '1';
            document.getElementById('voteForm').appendChild(hiddenInput);
            
            // Submit the form
            document.getElementById('voteForm').submit();
        }
    });
}
</script>

<div id="confirmationModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 800px;">
        <div class="modal-content rounded-lg overflow-hidden shadow-lg">
            <div class="modal-header bg-gradient-to-r from-green-600 to-green-400 text-white border-0">
                <h4 class="modal-title font-bold text-2xl">Review Your Votes</h4>
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body p-0">
                <div class="p-5 bg-gray-50 border-b">
                    <h5 class="text-center text-gray-800 text-xl font-bold mb-1">Please confirm your selections:</h5>
                    <p class="text-center text-gray-600">Review your votes before final submission</p>
                </div>
                <div id="voteReviewList" class="max-h-96 overflow-y-auto">
                    <!-- Vote list will be inserted here via JavaScript -->
                </div>
            </div>
            <div class="modal-footer bg-gray-50 border-0 flex justify-between p-4">
                <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg flex items-center transition duration-200" data-dismiss="modal">
                    <i class="fa fa-edit mr-2"></i> Edit Choices
                </button>
                <button type="button" class="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center transition duration-200" onclick="confirmSubmitVotes()">
                    <i class="fa fa-check-circle mr-2"></i> Submit Votes
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Platform Modal -->
<div id="platformModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-lg overflow-hidden shadow-lg">
            <div class="modal-header bg-gradient-to-r from-green-600 to-green-400 text-white border-0">
                <h4 class="modal-title font-bold text-xl" id="platformModalTitle">Candidate Platform</h4>
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="space-y-4" id="platformContent">
                    <div class="p-12 flex items-center justify-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer bg-gray-50 border-0 p-4">
                <button type="button" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center transition duration-200" data-dismiss="modal">
                    <i class="fa fa-times mr-2"></i> Close
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    /* Responsive image fixes */
    .candidate-card {
        display: flex;
        flex-direction: column;
        border-width: 2px;
        border-color: #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .candidate-card.selected {
        border-color: #10B981 !important;
        border-width: 3px !important;
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .candidate-card .relative {
        position: relative;
        height: 0;
        overflow: hidden;
    }
    
    /* Ensure images maintain aspect ratio */
    @media (max-width: 640px) {
        .candidate-card .relative {
            padding-top: 100%; /* 1:1 Aspect Ratio */
        }
        
        .candidate-card h4 {
            font-size: 1.25rem !important; /* Larger font on mobile */
            line-height: 1.3;
            padding: 0.25rem 0;
        }
        
        .candidate-grid {
            gap: 1rem !important; /* Tighter grid on mobile */
        }
    }
    
    /* Text enhancements */
    .text-primary {
        color: #38A169;
    }
    
    /* Animation for title */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate__fadeIn {
        animation: fadeIn 0.8s ease-out;
    }
    
    /* Highlighted selected card */
    .check-icon {
        display: flex !important;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .selected .check-icon {
        opacity: 1;
    }
    
    /* Platform button styles */
    .platform-btn {
        z-index: 5;
        position: relative;
    }
    
    /* Make sure the platform button doesn't trigger the candidate selection */
    .candidate-card {
        position: relative;
    }
    
    /* Ensure proper modal display on mobile */
    @media (max-width: 640px) {
        .modal-dialog {
            margin: 0.5rem;
        }
        
        #platformCandidateImage {
            width: 3.5rem;
            height: 3.5rem;
        }
    }

    /* Enhanced modal styles */
    #confirmationModal .modal-content {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    #confirmationModal .modal-header {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    
    #voteReviewList {
        scrollbar-width: thin;
        scrollbar-color: #10B981 #F3F4F6;
    }
    
    #voteReviewList::-webkit-scrollbar {
        width: 8px;
    }
    
    #voteReviewList::-webkit-scrollbar-track {
        background: #F3F4F6;
    }
    
    #voteReviewList::-webkit-scrollbar-thumb {
        background-color: #10B981;
        border-radius: 6px;
    }
    
    /* Animation for modal items */
    #voteReviewList > div {
        animation: fadeInUp 0.4s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Add delay to each item */
    #voteReviewList > div:nth-child(2) { animation-delay: 0.1s; }
    #voteReviewList > div:nth-child(3) { animation-delay: 0.15s; }
    #voteReviewList > div:nth-child(4) { animation-delay: 0.2s; }
    #voteReviewList > div:nth-child(5) { animation-delay: 0.25s; }
    #voteReviewList > div:nth-child(6) { animation-delay: 0.3s; }
    #voteReviewList > div:nth-child(7) { animation-delay: 0.35s; }
    #voteReviewList > div:nth-child(8) { animation-delay: 0.4s; }
    
    /* Responsive adjustments for extra-large modal */
    @media (max-width: 992px) {
        .modal-xl {
            max-width: 95% !important;
            margin: 0.5rem auto;
        }
    }
    
    @media (max-width: 768px) {
        #voteReviewList > div {
            padding: 1rem !important;
        }
        
        #voteReviewList .text-xl {
            font-size: 1.1rem;
        }
        
        #voteReviewList .text-lg {
            font-size: 0.95rem;
        }
    }
</style>

</body>
</html>
