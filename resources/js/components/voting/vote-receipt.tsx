import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Printer } from 'lucide-react';
import { format } from 'date-fns';
import voting from '@/routes/voting';

interface Vote {
    position: string;
    candidate: string;
    partylist?: string;
}

interface VoteReceiptProps {
    votes: Vote[];
    electionName: string;
    timestamp: string;
    referenceId: string;
}

export function VoteReceipt({ votes, electionName, timestamp, referenceId }: VoteReceiptProps) {
    const handlePrint = () => {
        // Open the Blade receipt page in a new window
        const receiptUrl = voting.receipt.url() + `?ref=${referenceId}`;
        window.open(receiptUrl, '_blank');
    };

    const handleDownload = () => {
        // Open the Blade receipt page for saving as PDF
        const receiptUrl = voting.receipt.url() + `?ref=${referenceId}`;
        window.open(receiptUrl, '_blank');
    };

    return (
        <Card className="print:shadow-none border-gray-200 dark:border-gray-800">
            <CardHeader className="text-center border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Vote Confirmation Receipt</CardTitle>
                <p className="text-sm text-muted-foreground">"{electionName}"</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Receipt Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Reference ID</p>
                        <p className="font-mono font-semibold text-gray-900 dark:text-gray-100">{referenceId}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Submitted At</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {format(new Date(timestamp), 'MMM dd, yyyy hh:mm a')}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Vote Summary */}
                <div>
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Your Selections</h3>
                    <div className="space-y-3">
                        {votes.map((vote, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-gray-800/50 rounded-lg"
                            >
                                <div className="w-6 h-6 bg-green-600 dark:bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted-foreground">
                                        {vote.position}
                                    </div>
                                    <div className="font-semibold text-sm truncate text-gray-900 dark:text-gray-100">
                                        {vote.candidate}
                                    </div>
                                    {vote.partylist && (
                                        <div className="text-xs text-green-600 dark:text-green-400">
                                            {vote.partylist}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Security Note */}
                <div className="text-xs text-center text-muted-foreground space-y-1">
                    <p>This is your vote confirmation receipt.</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Your vote has been securely recorded and cannot be changed.</p>
                </div>

                {/* Print Actions */}
                <div className="flex gap-2 print:hidden">
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="flex-1"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Print Receipt
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDownload}
                        className="flex-1"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Save as PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
