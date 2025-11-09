<?php
session_start();
include 'conn.php'; // Include the database connection


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deleted Elections History | Election System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Add SweetAlert2 library -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            200: '#bbf7d0',
                            300: '#86efac',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                            800: '#166534',
                            900: '#14532d',
                            950: '#052e16',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    boxShadow: {
                        'custom': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
                    }
                }
            }
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Add favicon -->
    <link rel="icon" href="../assets/favicon.ico" type="image/x-icon">
    <style>
        .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .slide-in-right {
            animation: slideInRight 0.3s forwards;
        }
        @keyframes slideInRight {
            from { transform: translateX(30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">
    <div class="min-h-screen flex flex-col">
        <!-- Navigation Bar -->
        <nav class="bg-primary-700 text-white shadow-lg sticky top-0 z-50">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="bg-white text-primary-700 p-2 rounded-full">
                        <i class="fas fa-vote-yea text-xl"></i>
                    </div>
                    <a href="dashboard.php" class="text-2xl font-bold tracking-tight">Election System</a>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="javascript:void(0)" onclick="confirmLogout()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 flex items-center space-x-1">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </nav>

        <!-- Content -->
        <div class="flex-grow container mx-auto px-4 py-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 class="text-3xl md:text-4xl font-bold text-primary-800 flex items-center">
                    <span class="bg-primary-100 text-primary-700 p-2 rounded-full mr-3">
                        <i class="fas fa-history"></i>
                    </span>
                    Deleted Elections History
                </h1>
            </div>
            
            <div class="bg-white shadow-custom rounded-xl p-6 border border-gray-100">
                <!-- Search and filter controls -->
                <div class="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="relative w-full md:w-1/2">
                        <input type="text" id="searchInput" placeholder="Search by election name..." 
                            class="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-12 bg-gray-50">
                        <span class="absolute left-4 top-3.5 text-gray-400">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <label for="sortOrder" class="text-gray-700 font-medium">Sort by:</label>
                        <select id="sortOrder" class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 pr-10 appearance-none">
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                            <option value="name">Election name</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="overflow-x-auto rounded-xl">
                    <table id="historyTable" class="table-auto w-full border-collapse">
                        <thead>
                            <tr class="bg-primary-700 text-white">
                                <th class="px-6 py-3.5 text-left font-semibold text-sm uppercase tracking-wider rounded-tl-lg">Election Name</th>
                                <th class="px-6 py-3.5 text-left font-semibold text-sm uppercase tracking-wider">Deleted At</th>
                                <th class="px-6 py-3.5 text-center font-semibold text-sm uppercase tracking-wider rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <?php
                            // Fetch deleted elections from the database
                            $sql = "SELECT * FROM history ORDER BY deleted_at DESC";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    // Format the date
                                    $deleted_date = date('M d, Y h:i A', strtotime($row['deleted_at']));
                                    
                                    echo "
                                        <tr class='hover:bg-gray-50 transition duration-150'>
                                            <td class='px-6 py-4 font-medium text-gray-900'>" . htmlspecialchars($row['election_title']) . "</td>
                                            <td class='px-6 py-4 text-gray-600'>" . $deleted_date . "</td>
                                            <td class='px-6 py-4 text-center'>
                                                <button class='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 view-history shadow-sm' data-id='" . $row['id'] . "'>
                                                    <i class='fas fa-eye mr-1'></i> View Details
                                                </button>
                                            </td>
                                        </tr>";
                                }
                            } else {
                                echo "
                                    <tr id='noRecordsRow'>
                                        <td colspan='3' class='px-6 py-12'>
                                            <div class='text-center text-gray-500 flex flex-col items-center'>
                                                <div class='bg-gray-100 rounded-full p-4 mb-3'>
                                                    <i class='fas fa-info-circle text-3xl text-gray-400'></i>
                                                </div>
                                                <p class='text-lg font-medium'>No deleted elections found.</p>
                                                <p class='text-sm text-gray-400 mt-1'>Elections that are deleted will appear here.</p>
                                            </div>
                                        </td>
                                    </tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
                
                <div id="pagination" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6">
                    <p class="text-sm text-gray-600">Showing <span id="showing-count" class="font-semibold">0</span> of <span id="total-count" class="font-semibold">0</span> records</p>
                    <div class="flex space-x-1">
                        <button id="prev-page" class="px-4 py-2 border border-gray-200 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span id="current-page" class="px-5 py-2 bg-primary-600 text-white font-medium">1</span>
                        <button id="next-page" class="px-4 py-2 border border-gray-200 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-primary-800 text-white py-8 mt-8">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="mb-4 md:mb-0">
                        <div class="flex items-center justify-center md:justify-start space-x-2 mb-3">
                            <div class="bg-white text-primary-700 p-2 rounded-full">
                                <i class="fas fa-vote-yea text-xl"></i>
                            </div>
                            <span class="text-xl font-bold">Election System</span>
                        </div>
                        <p class="text-primary-200 text-sm">&copy; <?php echo date('Y'); ?> All rights reserved.</p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4 md:gap-8">
                        <a href="#" class="text-white hover:text-primary-200 transition duration-300 text-center md:text-left">
                            <i class="fas fa-shield-alt mr-1"></i> Privacy Policy
                        </a>
                        <a href="#" class="text-white hover:text-primary-200 transition duration-300 text-center md:text-left">
                            <i class="fas fa-file-contract mr-1"></i> Terms of Use
                        </a>
                        <a href="#" class="text-white hover:text-primary-200 transition duration-300 text-center md:text-left">
                            <i class="fas fa-envelope mr-1"></i> Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <!-- History Modal -->
    <div id="historyModal" class="hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-2xl p-0 w-11/12 md:w-3/4 max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-primary-700 flex items-center">
                    <span class="bg-primary-100 text-primary-700 p-2 rounded-full mr-3">
                        <i class="fas fa-info-circle"></i>
                    </span>
                    Deleted Election Details
                </h2>
                <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition duration-300 bg-white rounded-full p-2 hover:bg-gray-100">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="loading-indicator" class="py-16 px-6 text-center text-gray-500">
                <div class="flex flex-col items-center">
                    <div class="shimmer w-16 h-16 rounded-full mb-4"></div>
                    <div class="shimmer w-48 h-6 rounded mb-2"></div>
                    <div class="shimmer w-64 h-4 rounded"></div>
                </div>
            </div>
            <div class="modal-body text-gray-700 hidden px-6 py-6 overflow-y-auto max-h-[60vh]" id="modal-content">
                <!-- Election history details will be loaded here dynamically -->
            </div>
            <div class="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button id="printDetails" class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full mr-3 transition duration-300 flex items-center">
                    <i class="fas fa-print mr-2"></i> Print Details
                </button>
                <button id="closeModalBtn" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-full transition duration-300 flex items-center">
                    <i class="fas fa-times mr-2"></i> Close
                </button>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function(){
            // Variables for pagination
            let currentPage = 1;
            const rowsPerPage = 10;
            let allRows = [];
            
            // Initialize the table
            function initTable() {
                allRows = $('#historyTable tbody tr:not(#noRecordsRow)').toArray();
                updatePagination();
            }
            
            // Update pagination display and controls
            function updatePagination() {
                const totalRows = allRows.length;
                const totalPages = Math.ceil(totalRows / rowsPerPage);
                
                $('#total-count').text(totalRows);
                const start = (currentPage - 1) * rowsPerPage + 1;
                const end = Math.min(currentPage * rowsPerPage, totalRows);
                $('#showing-count').text(totalRows > 0 ? `${start}-${end}` : '0');
                
                // Update page buttons
                $('#current-page').text(currentPage);
                $('#prev-page').prop('disabled', currentPage === 1);
                $('#next-page').prop('disabled', currentPage === totalPages || totalPages === 0);
                
                // Hide all rows
                $('#historyTable tbody tr:not(#noRecordsRow)').addClass('hidden');
                
                // Show rows for current page
                if (totalRows > 0) {
                    $('#noRecordsRow').addClass('hidden');
                    const rowsToShow = allRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
                    $(rowsToShow).removeClass('hidden').each(function(index) {
                        $(this).css('animation-delay', (index * 0.05) + 's').addClass('slide-in-right');
                    });
                } else {
                    $('#noRecordsRow').removeClass('hidden');
                }
            }
            
            // Initialize the table on page load
            initTable();
            
            // Pagination controls
            $('#prev-page').click(function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            });
            
            $('#next-page').click(function() {
                const totalPages = Math.ceil(allRows.length / rowsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            });
            
            // Search functionality with debounce
            let searchTimeout;
            $('#searchInput').on('input', function() {
                clearTimeout(searchTimeout);
                const searchInput = $(this);
                
                searchTimeout = setTimeout(function() {
                    const searchTerm = searchInput.val().toLowerCase();
                    
                    if (searchTerm.trim() === '') {
                        // Reset to original rows
                        allRows = $('#historyTable tbody tr:not(#noRecordsRow)').toArray();
                    } else {
                        // Filter rows based on search term
                        allRows = $('#historyTable tbody tr:not(#noRecordsRow)').filter(function() {
                            return $(this).text().toLowerCase().includes(searchTerm);
                        }).toArray();
                    }
                    
                    currentPage = 1; // Reset to first page
                    updatePagination();
                }, 300); // 300ms debounce
            });
            
            // Sorting functionality
            $('#sortOrder').change(function() {
                const sortOption = $(this).val();
                
                allRows.sort(function(a, b) {
                    const aText = $(a).find('td:first-child').text().trim();
                    const bText = $(b).find('td:first-child').text().trim();
                    const aDate = new Date($(a).find('td:nth-child(2)').text().trim());
                    const bDate = new Date($(b).find('td:nth-child(2)').text().trim());
                    
                    if (sortOption === 'name') {
                        return aText.localeCompare(bText);
                    } else if (sortOption === 'oldest') {
                        return aDate - bDate;
                    } else { // newest
                        return bDate - aDate;
                    }
                });
                
                currentPage = 1; // Reset to first page
                updatePagination();
            });

            // Handle the "View Details" button click
            $(document).on('click', '.view-history', function(){
                var id = $(this).data('id');
                
                // Show modal and loading indicator
                $('#historyModal').removeClass('hidden');
                $('#loading-indicator').removeClass('hidden');
                $('#modal-content').addClass('hidden');
                
                $.ajax({
                    url: 'view_history.php',
                    method: 'POST',
                    data: { id: id },
                    success: function(response){
                        // Hide loading indicator and show content with slight delay for smoother transition
                        setTimeout(function() {
                            $('#loading-indicator').addClass('hidden');
                            $('#modal-content').removeClass('hidden').html(response);
                        }, 500);
                    },
                    error: function() {
                        $('#loading-indicator').addClass('hidden');
                        $('#modal-content').removeClass('hidden').html(`
                            <div class="text-center text-red-600 py-8">
                                <div class="bg-red-100 rounded-full p-4 inline-block mb-4">
                                    <i class="fas fa-exclamation-triangle text-3xl"></i>
                                </div>
                                <p class="text-lg font-semibold">An error occurred</p>
                                <p class="text-gray-500 mt-2">We couldn't fetch the election details. Please try again.</p>
                                <button class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full try-again">
                                    <i class="fas fa-redo mr-1"></i> Try Again
                                </button>
                            </div>
                        `);
                    }
                });
            });
            
            // Try again button
            $(document).on('click', '.try-again', function() {
                const lastClickedButton = $('.view-history[aria-pressed="true"]');
                if (lastClickedButton.length) {
                    lastClickedButton.click();
                } else {
                    $('#historyModal').addClass('hidden');
                }
            });

            // Close the modal with different buttons
            $('#closeModal, #closeModalBtn').click(function(){
                $('#historyModal').addClass('hidden');
                $('.view-history').attr('aria-pressed', 'false');
            });
            
            // Close modal when clicking outside of it
            $(document).mouseup(function(e) {
                const modalContent = $(".modal-body").parent();
                if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0 && !$(e.target).hasClass('view-history')) {
                    $('#historyModal').addClass('hidden');
                    $('.view-history').attr('aria-pressed', 'false');
                }
            });
            
            // Escape key to close modal
            $(document).keydown(function(e) {
                if (e.key === "Escape") {
                    $('#historyModal').addClass('hidden');
                    $('.view-history').attr('aria-pressed', 'false');
                }
            });
            
            // When a user clicks the View Details button, mark it as pressed
            $(document).on('click', '.view-history', function() {
                $('.view-history').attr('aria-pressed', 'false');
                $(this).attr('aria-pressed', 'true');
            });
            
            // Print functionality
            $('#printDetails').click(function() {
                const printContent = document.getElementById('modal-content').innerHTML;
                const originalContent = document.body.innerHTML;
                const electionTitle = $('#modal-content').find('h3').first().text() || 'Deleted Election';
                
                document.body.innerHTML = `
                    <div style="padding: 40px; max-width: 800px; margin: 0 auto;">
                        <div style="display: flex; align-items: center; margin-bottom: 30px;">
                            <div style="background-color: #f0fdf4; color: #15803d; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 15px;">
                                <i class="fas fa-vote-yea" style="font-size: 24px;"></i>
                            </div>
                            <div>
                                <h1 style="color: #15803d; font-size: 24px; margin: 0; font-weight: bold;">Election System</h1>
                                <p style="color: #666; margin: 5px 0 0 0;">Deleted Election Report</p>
                            </div>
                        </div>
                        <h2 style="text-align: center; color: #15803d; margin-bottom: 20px; font-size: 28px; padding-bottom: 10px; border-bottom: 2px solid #dcfce7;">${electionTitle}</h2>
                        <div style="background-color: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            ${printContent}
                        </div>
                        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                            <p>Generated on ${new Date().toLocaleString()}</p>
                            <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
                        </div>
                    </div>
                `;
                
                window.print();
                document.body.innerHTML = originalContent;
                
                // Re-initialize event handlers after restoring content
                $(document).ready(function() {
                    initTable();
                });
            });
        });
        
        // Logout confirmation function
        function confirmLogout() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out of the system!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#16a34a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
                background: '#ffffff',
                borderRadius: '15px',
                iconColor: '#16a34a',
                customClass: {
                    confirmButton: 'px-5 py-2 rounded-lg',
                    cancelButton: 'px-5 py-2 rounded-lg'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "logout.php";
                }
            });
        }
    </script>
</body>
</html>