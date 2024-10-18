package develup.infra.jpa;

import java.util.Random;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Profile("dev")
public class DataSourceRouter extends AbstractRoutingDataSource {

    private final Random random = new Random();

    @Override
    protected Object determineCurrentLookupKey() {
        boolean readOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (random.nextInt() % 2 == 1) {
            return "read";
        }
        return "write";
    }
}
