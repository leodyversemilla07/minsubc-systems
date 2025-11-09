import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Printer } from 'lucide-react';
import { format } from 'date-fns';

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
        window.print();
    };

    return (
        <Card className="print:shadow-none">
            <CardHeader className="text-center border-b">
                <CardTitle className="text-xl">Vote Confirmation Receipt</CardTitle>
                <p className="text-sm text-muted-foreground">{electionName}</p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Receipt Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Reference ID</p>
                        <p className="font-mono font-semibold">{referenceId}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Submitted At</p>
                        <p className="font-semibold">
                            {format(new Date(timestamp), 'MMM dd, yyyy hh:mm a')}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Vote Summary */}
                <div>
                    <h3 className="font-semibold mb-3">Your Selections</h3>
                    <div className="space-y-3">
                        {votes.map((vote, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                            >
                                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted-foreground">
                                        {vote.position}
                                    </div>
                                    <div className="font-semibold text-sm truncate">
                                        {vote.candidate}
                                    </div>
                                    {vote.partylist && (
                                        <div className="text-xs text-green-600">
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
                    <p className="font-semibold">Your vote has been securely recorded and cannot be changed.</p>
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
                        onClick={handlePrint}
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
